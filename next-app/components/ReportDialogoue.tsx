
import React, { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Textarea } from './ui/textarea'
import { Button } from './ui/button'
import axiosInstance from '@/lib/axiosInstance'

const ReportDialogoue = ({reportOpen, setReportOpen,  userId, commentId}: any) => {
    const [reportReason, setReportReason] = useState("")
    const [reportDescription, setReportDescription] = useState("");
const [error, setError] = useState("");

    

const handleSubmitReport = async () => {
  if (!reportReason) return;
  setError("");
  try {
    await axiosInstance.post(
      `/comment/reportcomment/${commentId}`,
      {
        userId,
        reason: reportReason,
        description: reportDescription,
      }
    );
    setReportReason("");
    setReportDescription("");
    setReportOpen(false);

  
  } catch (err:  any) {
    if (err.response?.status === 400) {
      setError("You have already reported this comment.");
    } else {
      setError("Something went wrong. Please try again.");
    }
  }
};
  return (
 <Dialog open={reportOpen} onOpenChange={setReportOpen}>
  <DialogContent className="sm:max-w-md p-5">
    <DialogHeader >
      <DialogTitle  className=' text-center font-semibold mb-2'>Report Comment</DialogTitle>
      <DialogDescription>
        Help us understand what's wrong with this comment. Your report will be
        reviewed by our moderation team.
      </DialogDescription>
    </DialogHeader>

    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium">
          Why are you reporting this comment?
        </label>

        <Select
          value={reportReason}
          onValueChange={setReportReason}
        >
          <SelectTrigger className="mt-2">
            <SelectValue placeholder="Select a reason" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="Spam">
              Spam or misleading
            </SelectItem>

            <SelectItem value="Harassment">
              Harassment or bullying
            </SelectItem>

            <SelectItem value="Hate Speech">
              Hate speech
            </SelectItem>

            <SelectItem value="Violence">
              Violence or threats
            </SelectItem>


            <SelectItem value="Misinformation">
              Misinformation
            </SelectItem>


            <SelectItem value="Other">
              Other
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="text-sm font-medium">
          Additional details (optional)
        </label>

        <Textarea
          value={reportDescription}
          onChange={(e) => setReportDescription(e.target.value)}
          placeholder="Tell us more about the issue..."
          className="mt-2 max-h-20 resize-none"
          rows={4}
        />
      </div>
    </div>

    <DialogFooter className="flex flex-col items-start gap-2">
  {error && (
    <p className="text-sm text-red-500 font-medium">
      {error}
    </p>
  )}

  <div className="flex w-full justify-end gap-3">
    <Button
      variant="outline"
      onClick={() => {
        setError("")
        setReportOpen(false)}}
    >
      Cancel
    </Button>

    <Button
      disabled={!reportReason}
      onClick={handleSubmitReport}
    >
      Submit Report
    </Button>
  </div>
</DialogFooter>

  </DialogContent>
</Dialog>
  )
}

export default ReportDialogoue
