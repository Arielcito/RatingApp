'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { toast } from 'react-hot-toast'
import type { Subscriber } from '@/types/subscriber'
import type { Channel } from '@/types/channel'
import { useSubscriber } from '@/app/context/SubscriberContext'
import Image from 'next/image'
import api from '@/lib/axios'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

const profileFormSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  birthDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Fecha inválida'),
  gender: z.string(),
  telefono: z.string().min(8, 'Teléfono inválido'),
  document: z.string().min(5, 'Documento inválido'),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

export function ProfileForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const { subscriber, setSubscriber } = useSubscriber()
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: async () => {
      try {
        const response = await api.post('/subscriptors/getSubscriber', { id: subscriber?.id })
        if (!response.data) throw new Error('Error fetching profile')
        const data: Subscriber = response.data
        
        const formattedDate = data.birthDate ? 
          new Date(data.birthDate).toISOString().split('T')[0] : ''
        
        return {
          name: data.name || '',
          email: data.email || '',
          birthDate: formattedDate,
          gender: data.gender || '',
          telefono: data.telefono || '',
          document: data.document || '',
        }
      } catch (error) {
        console.error('Error loading profile:', error)
        toast.error('Error al cargar el perfil')
        return {
          name: '',
          email: '',
          birthDate: '',
          gender: '',
          telefono: '',
          document: ''
        }
      }
    },
  })

  async function onSubmit(data: ProfileFormValues) {
    setIsLoading(true)
    try {
      const payload = {
        id: subscriber?.id,
        ...data,
        birthDate: new Date(data.birthDate).toISOString(),
        created: new Date().toISOString(),
        passwd: subscriber?.passwd || '',
        captcha: null
      }

      const response = await api.post('/subscriptors/add', payload)
      if (!response.data) throw new Error('Error al actualizar perfil')

      toast.success('Perfil actualizado correctamente')
      router.refresh()
    } catch (error) {
      toast.error('Error al actualizar el perfil')
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = () => {
    setSubscriber(null)
    router.push('/auth/signin')
  }

  const handleDeleteAccount = async () => {
    setIsDeleting(true)
    try {
      const response = await api.post('/subscriptors/delete', { id: subscriber?.id })
      if (!response.data) throw new Error('Error al eliminar cuenta')
      
      toast.success('Cuenta eliminada correctamente')
      setSubscriber(null)
      router.push('/auth/signin')
    } catch (error) {
      toast.error('Error al eliminar la cuenta')
      console.error(error)
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div className="min-h-screen">
      <div className="relative pt-8 px-4">
        <button 
          type="button" 
          className="absolute top-4 left-4 text-white" 
          aria-label="Volver"
          onClick={() => router.back()}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <div className="flex flex-col items-center">
          <div className="relative w-24 h-24 mb-4">
            <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200">
              <Image
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=96&h=96&fit=crop&auto=format"
                alt="Foto de perfil"
                width={96}
                height={96}
                className="object-cover"
                priority
              />
            </div>
            <button type="button" className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-lg" aria-label="Cambiar foto de perfil">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
          </div>
          <h1 className="text-2xl font-bold text-white mb-8">¡Hola {form.getValues().name || 'Usuario'}!</h1>
        </div>

        <div className="bg-white rounded-t-3xl px-4 py-6 space-y-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre</FormLabel>
                    <FormControl>
                      <Input placeholder="Tu nombre" {...field} />
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
                      <Input placeholder="tu@email.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="birthDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fecha de Nacimiento</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Género</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona tu género" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="M">Masculino</SelectItem>
                        <SelectItem value="F">Femenino</SelectItem>
                        <SelectItem value="O">Otro</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="telefono"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Teléfono</FormLabel>
                    <FormControl>
                      <Input placeholder="Tu teléfono" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="document"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Documento</FormLabel>
                    <FormControl>
                      <Input placeholder="Tu documento" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Guardando...' : 'Guardar Cambios'}
              </Button>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="destructive"
                    className="w-full mt-4"
                    disabled={isDeleting}
                  >
                    {isDeleting ? 'Eliminando...' : 'Eliminar Cuenta'}
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Esta acción no se puede deshacer. Se eliminará permanentemente tu cuenta y todos sus datos asociados.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleDeleteAccount}
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                      Eliminar
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

              <button
                type="button"
                className="w-full mt-6 p-4 text-red-600 font-medium"
                onClick={handleLogout}
              >
                Cerrar Sesión
              </button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  )
} 