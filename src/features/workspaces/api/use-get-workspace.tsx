import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/rpc";
import { Workspace } from "../types";

interface useGetWorkspaceProps {
  workspaceId: string;
}

export const useGetWorkspace = ({ workspaceId }: useGetWorkspaceProps) => {
  const query = useQuery<Workspace>({
    queryKey: ["workspace", workspaceId],
    queryFn: async () => {
      const response = await client.api.workspaces[":workspaceId"].$get({
        param: { workspaceId },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch workspace");
      }

      const { data } = await response.json();

      return data;
    },
  });
  return query;
};
