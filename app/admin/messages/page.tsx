import { getMessages } from '@/app/actions/messages';
import MessageTable from '@/components/Admin/Messages/MessageTable';

export default async function AdminMessagesPage() {
  const messages = await getMessages();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Messages</h1>
        <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-0.5 text-sm font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-300">
          {messages.length} Total
        </span>
      </div>

      <MessageTable initialMessages={messages} />
    </div>
  );
}
