export interface Game {
  id: number;
  name: string;
  master: string;
  date: string;
  time: string;
  city: string;
  address: string;
  level: number;
  system: string;
  maxPlayers: number;
  currentPlayers: number;
  description: string;
  isOnline: boolean;
  extraDetails: string;
}
export interface Rpg {
  top: number;
  title: string;
  description: {
    es: string;
    en: string;
  };
  image: string;
  since: number;
}
