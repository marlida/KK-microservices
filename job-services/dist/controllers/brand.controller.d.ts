import { Request, Response } from 'express';
export declare const createBrand: (req: Request, res: Response) => Promise<void>;
export declare const getBrand: (req: Request, res: Response) => Promise<void>;
export declare const getBrandById: (req: Request, res: Response) => Promise<void>;
export declare const updateBrand: (req: Request, res: Response) => Promise<void>;
export declare const deleteBrand: (req: Request, res: Response) => Promise<void>;
