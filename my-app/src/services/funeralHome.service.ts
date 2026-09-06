import { ApiClient } from "@/lib/api";
import apiClient from "@/lib/api";
import { FuneralHome } from "@/types";

export interface IFuneralHomeService {
  createFuneralHome(name: string): Promise<FuneralHome>;
  getFuneralHome(): Promise<FuneralHome>;
}

export class FuneralHomeService implements IFuneralHomeService {
  constructor(private apiClient: ApiClient) {}

  async createFuneralHome(name: string): Promise<FuneralHome> {
    const response = await this.apiClient.post<{
      success: boolean;
      data: { funeralHome: FuneralHome };
    }>("/funeral-homes/register", { name });
    return response.data.funeralHome;
  }

  async getFuneralHome(): Promise<FuneralHome> {
    const response = await this.apiClient.get<{
      success: boolean;
      data: FuneralHome;
    }>("/funeral-homes");
    return response.data;
  }
}

export const funeralHomeService = new FuneralHomeService(apiClient);
