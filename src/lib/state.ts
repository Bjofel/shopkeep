import type { Timestamp } from "bson";
import * as database from '$lib/database'

const client = await database.connect()
const db = client.db("test")
const forumMessages = db.collection("forum_messages")

export const forums: { id: string; name: string; messages: string[] }[] = [
    {
      id: "asdghas",
      name: "cool forum",
      messages: ["tjena","hej"],
    },
  ];
// _id: string, id: string, postTitle: string, uploader: string, createdAt: Timestamp, postertalk: string, disscussion: Array<{}>, 
