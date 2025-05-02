'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSubscriber } from '@/app/context/SubscriberContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from 'react-hot-toast'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'

interface UserForm {
  name: string
  email: string
  password: string
  role: 'admin' | 'user'
}

export function EnterpriseProfileForm() {
  const router = useRouter()
  const { subscriber, setSubscriber } = useSubscriber()
  const [isLoading, setIsLoading] = useState(false)
  const [showNewUserDialog, setShowNewUserDialog] = useState(false)
  const [newUser, setNewUser] = useState<UserForm>({
    name: '',
    email: '',
    password: '',
    role: 'user'
  })

  const handleLogout = () => {
    setSubscriber(null)
    router.push('/enterprise/auth/signin')
  }

  const handleNewUserSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      // Aquí iría la llamada a la API para crear el nuevo usuario
      toast.success('Usuario creado correctamente')
      setShowNewUserDialog(false)
      setNewUser({ name: '', email: '', password: '', role: 'user' })
    } catch (error) {
      toast.error('Error al crear el usuario')
    } finally {
      setIsLoading(false)
    }
  }

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      // Aquí iría la llamada a la API para cambiar la contraseña
      toast.success('Contraseña cambiada correctamente')
    } catch (error) {
      toast.error('Error al cambiar la contraseña')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Perfil de Usuario</h1>
          <Button variant="outline" onClick={handleLogout}>
            Cerrar Sesión
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Información del Usuario */}
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Información Personal</h2>
            <div className="space-y-4">
              <div>
                <Label>Nombre</Label>
                <p className="text-gray-300">{subscriber?.name}</p>
              </div>
              <div>
                <Label>Email</Label>
                <p className="text-gray-300">{subscriber?.email}</p>
              </div>
              <div>
                <Label>Rol</Label>
                <p className="text-gray-300">{subscriber?.role === 'admin' ? 'Administrador' : 'Usuario'}</p>
              </div>
            </div>
          </div>

          {/* Cambiar Contraseña */}
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Cambiar Contraseña</h2>
            <form onSubmit={handleChangePassword} className="space-y-4">
              <div>
                <Label htmlFor="currentPassword">Contraseña Actual</Label>
                <Input
                  id="currentPassword"
                  type="password"
                  className="bg-gray-700 border-gray-600"
                />
              </div>
              <div>
                <Label htmlFor="newPassword">Nueva Contraseña</Label>
                <Input
                  id="newPassword"
                  type="password"
                  className="bg-gray-700 border-gray-600"
                />
              </div>
              <div>
                <Label htmlFor="confirmPassword">Confirmar Nueva Contraseña</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  className="bg-gray-700 border-gray-600"
                />
              </div>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Cambiando...' : 'Cambiar Contraseña'}
              </Button>
            </form>
          </div>

          {/* Soporte */}
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Soporte</h2>
            <p className="text-gray-300 mb-4">¿Necesitas ayuda? Contáctanos por WhatsApp</p>
            <div className="space-y-4">
              <Button
                onClick={() => window.open('https://wa.me/1234567890', '_blank')}
                className="bg-green-600 hover:bg-green-700 w-full"
              >
                Abrir Chat de Soporte
              </Button>
              <Button
                onClick={() => window.open('https://www.ratingapp.com.ar/terminos-y-condiciones', '_blank')}
                variant="outline"
                className="w-full"
              >
                Términos y Condiciones
              </Button>
            </div>
          </div>

          {/* Gestión de Usuarios (solo para admin) */}
          {subscriber?.role === 'admin' && (
            <div className="bg-gray-800 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Gestión de Usuarios</h2>
              <Dialog open={showNewUserDialog} onOpenChange={setShowNewUserDialog}>
                <DialogTrigger asChild>
                  <Button className="w-full">Agregar Nuevo Usuario</Button>
                </DialogTrigger>
                <DialogContent className="bg-gray-800 text-white">
                  <DialogHeader>
                    <DialogTitle>Nuevo Usuario</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleNewUserSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="name">Nombre</Label>
                      <Input
                        id="name"
                        value={newUser.name}
                        onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                        className="bg-gray-700 border-gray-600"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={newUser.email}
                        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                        className="bg-gray-700 border-gray-600"
                      />
                    </div>
                    <div>
                      <Label htmlFor="password">Contraseña</Label>
                      <Input
                        id="password"
                        type="password"
                        value={newUser.password}
                        onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                        className="bg-gray-700 border-gray-600"
                      />
                    </div>
                    <div>
                      <Label htmlFor="role">Rol</Label>
                      <Select
                        value={newUser.role}
                        onValueChange={(value: 'admin' | 'user') => setNewUser({ ...newUser, role: value })}
                      >
                        <SelectTrigger className="bg-gray-700 border-gray-600">
                          <SelectValue placeholder="Seleccionar rol" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="admin">Administrador</SelectItem>
                          <SelectItem value="user">Usuario</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button type="submit" disabled={isLoading} className="w-full">
                      {isLoading ? 'Creando...' : 'Crear Usuario'}
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 