'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Switch } from '@/components/ui/switch'
import { toast } from 'react-hot-toast'
import type { User } from '@/types/user'
import { userService } from '@/services/user-service'

const userFormSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
  ratingSignalId: z.number(),
})

type UserFormValues = z.infer<typeof userFormSchema>

export function UserManagement() {
  const [users, setUsers] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)

  const form = useForm<UserFormValues>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      ratingSignalId: 1, // Default rating signal ID
    },
  })

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      const data = await userService.listByRatingSignal(1)
      setUsers(data)
    } catch (error) {
      console.error('Error fetching users:', error)
      toast.error('Error al cargar usuarios')
    }
  }

  const onSubmit = async (data: UserFormValues) => {
    setIsLoading(true)
    try {
      if (editingUser) {
        await userService.update({ ...data, id: editingUser.id })
        toast.success('Usuario actualizado')
      } else {
        await userService.add(data)
        toast.success('Usuario creado')
      }
      
      form.reset()
      setEditingUser(null)
      fetchUsers()
    } catch (error) {
      console.error('Error saving user:', error)
      toast.error('Error al guardar usuario')
    } finally {
      setIsLoading(false)
    }
  }

  const handleEdit = (user: User) => {
    setEditingUser(user)
    form.reset({
      name: user.name || '',
      email: user.email || '',
      password: '',
      ratingSignalId: user.ratingSignalId || 1,
    })
  }

  const handleToggleEnabled = async (user: User) => {
    try {
      await userService.update({
        ...user,
        enabled: !user.enabled,
      })
      toast.success('Estado actualizado')
      fetchUsers()
    } catch (error) {
      console.error('Error updating user:', error)
      toast.error('Error al actualizar estado')
    }
  }

  return (
    <div className="space-y-6">
      <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-6 shadow-solid-7">
        <h2 className="text-xl font-semibold text-dark mb-4">
          {editingUser ? 'Editar Usuario' : 'Nuevo Usuario'}
        </h2>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} type="email" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contraseña</FormLabel>
                    <FormControl>
                      <Input {...field} type="password" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="ratingSignalId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ID de Señal</FormLabel>
                    <FormControl>
                      <Input 
                        {...field} 
                        type="number"
                        onChange={e => field.onChange(parseInt(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex gap-4">
              <Button 
                type="submit" 
                className="bg-gradient-custom text-white hover:opacity-90"
                disabled={isLoading}
              >
                {isLoading ? 'Guardando...' : editingUser ? 'Actualizar' : 'Crear'}
              </Button>
              {editingUser && (
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => {
                    setEditingUser(null)
                    form.reset()
                  }}
                >
                  Cancelar
                </Button>
              )}
            </div>
          </form>
        </Form>
      </div>

      <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-6 shadow-solid-7">
        <h2 className="text-xl font-semibold text-dark mb-4">Lista de Usuarios</h2>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Switch
                      checked={user.enabled}
                      onCheckedChange={() => handleToggleEnabled(user)}
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(user)}
                    >
                      Editar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
} 