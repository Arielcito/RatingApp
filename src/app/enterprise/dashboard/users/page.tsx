import { UserManagement } from '@/components/admin/user-management'

export default function AdminUsersPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-white mb-8">Gestión de Usuarios</h1>
      <UserManagement />
    </div>
  )
} 