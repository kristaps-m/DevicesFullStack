export default interface IOneDevice {
  id: number;
  name: string;
  model: string;
  messagesRecieved: number;
  messagesMaximum: number;
  connectionStart: string | Date;
  isOnline: boolean;
}
