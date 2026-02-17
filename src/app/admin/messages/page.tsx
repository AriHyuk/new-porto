import { getMessages } from '@/app/actions/messages';
import MessageTable from '@/components/Admin/Messages/MessageTable';

export default async function AdminMessagesPage() {
  const messages = await getMessages();
  const pendingCount = messages.filter(m => m.status === 'pending').length;

  return (
    <div className="space-y-8 pb-12">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            Messages
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Manage your collaboration inquiries and service requests.
          </p>
        </div>
        
        <div className="flex gap-4">
          <div className="px-4 py-2 rounded-2xl bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 shadow-sm">
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">Total</span>
            <span className="text-xl font-black text-gray-900 dark:text-white leading-none">{messages.length}</span>
          </div>
          <div className="px-4 py-2 rounded-2xl bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900/30 shadow-sm">
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400 block">Pending</span>
            <span className="text-xl font-black text-blue-600 dark:text-blue-400 leading-none">{pendingCount}</span>
          </div>
        </div>
      </div>

      {/* Main Table / List */}
      <MessageTable initialMessages={messages} />
    </div>
  );
}
