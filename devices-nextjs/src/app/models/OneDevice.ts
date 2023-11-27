export default interface OneDevice {
  id: number;
  name: string;
  model: string;
  messagesRecieved: number;
  messagesMaximum: number;
  connectionStart: string;
}
