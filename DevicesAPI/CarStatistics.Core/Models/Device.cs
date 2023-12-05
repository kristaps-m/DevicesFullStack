namespace Devices.Core.Models

{
    public class Device : Entity
    {
        public string Name { get; set; } = String.Empty;
        public string Model { get; set; } = String.Empty;
        public int MessagesRecieved { get; set; }
        public int MessagesMaximum { get; set; }
        public DateTime ConnectionStart { get; set; }
        public bool IsOnline { get; set; } = false;
    }
}
