export interface AIProvider {
  id: string;
  name: string;
  description: string;
}

export interface AIModel {
  id: string;
  name: string;
  iconUrl?: string;
  description: string;
  model: string;
  provider: AIProvider;
  isDefault: boolean;
  isPremium: boolean;
}
