import { useParams } from "next/navigation";
import React from "react";

const useTaskId = () => {
  const params = useParams();
  return params.taskId as string;
};

export default useTaskId;
