import { NextApiRequest, NextApiResponse } from 'next';
import { ResponseData } from '@/types';
import { BASE_URL } from '@/shared/constants/url';

export async function getData(params: Partial<{ [p: string]: any }>) {
    const { type, year } = params;
    const response = await fetch(
      `${BASE_URL}${type ? `?type=${type}` : ''}${year ? type ? `&year=${year}` : `?year=${year}` : ''}`,
    );
    const jsonData = await response.json();
    return jsonData;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
    const jsonData = await getData(req.query);
    res.status(200).json(jsonData);
}
