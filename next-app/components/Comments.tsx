import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { formatDistanceToNow } from "date-fns";
import { useUser } from "@/context/AuthContext";
import axiosInstance from "@/lib/axiosInstance";
import { ThumbsDown, ThumbsUp } from "lucide-react";

import ReportDialogoue from "./ReportDialogoue";

interface Comment {
  _id: string;
  videoid: string;
  userid: string;
  commentbody: string;
  usercommented: string;
  commentedon: string;
   likes?: string[];
  dislikes?: string[];
}


const Comments = ({ videoId }: any) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [translations, setTranslations] = useState<Record<string, string>>({});
  const [reportOpen, setReportOpen] = useState(false);
const [reportCommentId, setReportCommentId] = useState("");

  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");
  const { user } = useUser();
  const [loading, setLoading] = useState(true);
  
  
  useEffect(() => {
    loadComments();
  }, [videoId]);

  const loadComments = async () => {
    try {
      const res = await axiosInstance.get(`/comment/${videoId}`);
      console.log("res comment ", res.data)
      setComments(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  if (loading) {
    return <div>Loading history...</div>;
  }
  const handleSubmitComment = async () => {
    if (!user || !newComment.trim()) return;
    setError("");
    setIsSubmitting(true);
    try {
      const res = await axiosInstance.post("/comment/postcomment", {
        videoid: videoId,
        userid: user._id,
        commentbody: newComment,
        usercommented: user.name,
      });
      if (res.data.comment) {
        const newCommentObj: Comment = {
          _id: Date.now().toString(),
          videoid: videoId,
          userid: user._id!,
          commentbody: newComment,
          usercommented: user.name || "Anonymous",
          commentedon: new Date().toISOString(),
        };
        setComments([newCommentObj, ...comments]);
      }
      setNewComment("");
    } catch (error: any) {
      
       setError(
    error?.response?.data?.message ||
      "Something went wrong."
  );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (comment: Comment) => {
    setEditingCommentId(comment._id);
    setEditText(comment.commentbody);
  };

  const handleUpdateComment = async () => {
    if (!editText.trim()) return;
    try {
      const res = await axiosInstance.post(
        `/comment/editcomment/${editingCommentId}`,
        { commentbody: editText }
      );
      if (res.data) {
        setComments((prev) =>
          prev.map((c) =>
            c._id === editingCommentId ? { ...c, commentbody: editText } : c
          )
        );
        setEditingCommentId(null);
        setEditText("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await axiosInstance.delete(`/comment/deletecomment/${id}`);
      if (res.data.comment) {
        setComments((prev) => prev.filter((c) => c._id !== id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLike = async (commentId: string) => {
  try {
    const res = await axiosInstance.put(`/comment/likecomment/${commentId}`, {
      id: user?._id,
    });

    setComments((prev) =>
      prev.map((comment) =>
        comment._id === commentId ? res.data.comment : comment
      )
    );
  } catch (error) {
    console.log(error);
  }
};

const handleDislike = async (commentId: string) => {
  try {
    const res = await axiosInstance.put(`/comment/dislikecomment/${commentId}`,{
      id: user?._id,
    });

    setComments((prev) =>
      prev.map((comment) =>
        comment._id === commentId ? res.data.comment : comment
      )
    );
  } catch (error) {
    console.log(error);
  }
};

const handleTranslate = async(commentId:string)=>{

  try {

    const res = await axiosInstance.post(
      "/comment/translate",
      {
        commentId,
        targetLanguage: user?.preferredLanguage || "en"
      }
    );


    setTranslations(prev=>({
      ...prev,
      [commentId]:res.data.translatedText
    }));


  } catch(error){
    console.log(error);
  }

};


const openReportDialog = (commentId: string) => {
  setReportCommentId(commentId);

  setReportOpen(true);
};

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">{comments.length} Comments</h2>

      {user && (
        <div className="flex gap-4">
          <Avatar className="w-10 h-10">
            <AvatarImage src={user.image || ""} />
            <AvatarFallback>{user.name?.[0] || "U"}</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-2">
            <Textarea
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e: any) => setNewComment(e.target.value)}
              className="min-h-[30px] resize-none border-0 border-b-2 rounded-none focus-visible:ring-0"
            />
            {error && <p className="text-sm text-red-500">{error}</p>}
            <div className="flex gap-2 justify-end">
              <Button
                variant="ghost"
                onClick={() => {setNewComment("")
                  setError("");
                }}
                disabled={!newComment.trim()}
              >
                Cancel
              </Button>
              <Button
                onClick={
                    handleSubmitComment
                }
                disabled={!newComment.trim() || isSubmitting}
              >
                Comment
              </Button>
            </div>
          </div>
        </div>
      )}
      <div className="space-y-4">
        {comments.length === 0 ? (
          <p className="text-sm text-gray-500 italic">
            No comments yet. Be the first to comment!
          </p>
        ) : (
          comments.map((comment) => (
            <div key={comment._id} className="flex gap-4">
              <Avatar className="w-10 h-10">
                <AvatarImage src="/placeholder.svg?height=40&width=40" />
                <AvatarFallback>{comment.usercommented[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-sm">
                    {comment.usercommented}
                  </span>
                  <span className="text-xs text-gray-600">
                    {formatDistanceToNow(new Date(comment.commentedon))} ago
                  </span>
                </div>

                {editingCommentId === comment._id ? (
             <div className="space-y-2">
    <Textarea
      value={editText}
      onChange={(e) => setEditText(e.target.value)}
    />

    <div className="flex justify-end gap-2">
      <Button onClick={handleUpdateComment}>Save</Button>

      <Button
        variant="ghost"
        onClick={() => {
          setEditingCommentId(null);
          setEditText("");
        }}
      >
        Cancel
      </Button>
    </div>
  </div>
                ) : (
                  <>
                   <p className="text-sm">
  {translations[comment._id] || comment.commentbody}
</p>

{translations[comment._id] ? (
  <button
    onClick={() => {
      setTranslations((prev) => {
        const updated = { ...prev };
        delete updated[comment._id];
        return updated;
      });
    }}
    className="text-blue-500 text-sm"
  >
    Show Original
  </button>
) : (
  <button
    onClick={() => handleTranslate(comment._id)}
    className="text-blue-500 text-sm"
  >
    Translate
  </button>
)}
    <div className="mt-2 flex items-center gap-4 text-sm">
  <button
    onClick={() => handleLike(comment._id)}
    className="flex items-center gap-1 text-black"
  >
    <ThumbsUp
      className={`h-4 w-4 ${
        comment?.likes?.includes(user?._id || "")
          ? "fill-black"
          : "fill-none"
      }`}
    />
    <span>{comment?.likes?.length ?? 0}</span>
  </button>

  <button
    onClick={() => handleDislike(comment._id)}
    className="flex items-center gap-1 text-black"
  >
    <ThumbsDown
      className={`h-4 w-4 ${
        comment?.dislikes?.includes(user?._id || "")
          ? "fill-black"
          : "fill-none"
      }`}
    />
    <span>{comment?.dislikes?.length ?? 0}</span>
  </button>
</div>           {comment.userid === user?._id && (
                      <div className="flex gap-2 mt-2 text-sm text-gray-500">

                        <button
                        onClick={() => handleEdit(comment)}
                         >
                          Edit
                        </button>
                        <button 
                        onClick={() => handleDelete(comment._id)}
                        >
                          Delete
                        </button>
                        <Button
  variant="ghost"
  size="sm"
  onClick={() => openReportDialog(comment._id)}
>
  Report
</Button>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          ))
        )}
      </div>
      <ReportDialogoue reportOpen={reportOpen} setReportOpen={setReportOpen} userId={user?._id} commentId={reportCommentId}/>
    </div>
  );
};

export default Comments;