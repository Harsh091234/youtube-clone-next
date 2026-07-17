import type { Request, Response } from "express";
export declare const postcomment: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getallcomment: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const deletecomment: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const editcomment: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=comment.d.ts.map