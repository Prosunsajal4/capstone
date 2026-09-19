import Chat from "../playground/components/Chat";

export default function ChatPage() {
  return (
    <div className="flex flex-col h-screen max-w-3xl mx-auto">
      <header className="p-4 border-b bg-white">
        <h1 className="text-xl font-bold">AI Chat</h1>
        <p className="text-sm text-gray-500">Streamed responses powered by Claude</p>
      </header>
      <Chat />
    </div>
  );
}
