
import React, { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Textarea } from './ui/textarea'
import { Button } from './ui/button'

const ReportDialogoue = ({reportOpen, setReportOpen}: any) => {
    const [reportReason, setReportReason] = useState("")
    const [reportDescription, setReportDescription] = useState("");

    const submitReport = () => {}

  return (
 <Dialog open={reportOpen} onOpenChange={setReportOpen}>
  <DialogContent className="sm:max-w-md">
    <DialogHeader>
      <DialogTitle>Report Comment</DialogTitle>
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

            <SelectItem value="Sexual Content">
              Sexual or explicit content
            </SelectItem>

            <SelectItem value="Misinformation">
              Misinformation
            </SelectItem>

            <SelectItem value="Impersonation">
              Impersonation
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
          className="mt-2"
          rows={4}
        />
      </div>
    </div>

    <DialogFooter>
      <Button
        variant="outline"
        onClick={() => setReportOpen(false)}
      >
        Cancel
      </Button>

      <Button
        disabled={!reportReason}
        onClick={submitReport}
      >
        Submit Report
      </Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
  )
}

export default ReportDialogoue
