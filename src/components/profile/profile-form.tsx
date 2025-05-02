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
    <div className="min-h-screen ">
      <div className="relative pt-8 px-4 max-w-2xl mx-auto">
        <button 
          type="button" 
          className="absolute top-4 left-4 text-white hover:bg-white/20 p-2 rounded-full transition-colors duration-200" 
          aria-label="Volver"
          onClick={() => router.back()}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <div className="flex flex-col items-center">
          <div className="relative w-32 h-32 mb-6 group">
            <div className="w-32 h-32 rounded-full overflow-hidden bg-white/20 backdrop-blur-sm ring-4 ring-white/20">
              <Image
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=128&h=128&fit=crop&auto=format"
                alt="Foto de perfil"
                width={128}
                height={128}
                className="object-cover transition-transform duration-300 group-hover:scale-110"
                priority
              />
            </div>
            <button 
              type="button" 
              className="absolute bottom-0 right-0 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-solid-7 transform transition-all duration-300 hover:scale-110 hover:bg-white" 
              aria-label="Cambiar foto de perfil"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">¡Hola {form.getValues().name || 'Usuario'}!</h1>
          <p className="text-white/80 text-sm mb-8">Gestiona tu información personal y preferencias</p>
        </div>

        <div className="bg-white/95 backdrop-blur-sm rounded-3xl px-6 py-8 space-y-6 shadow-solid-7">
          <div className="space-y-1">
            <h2 className="text-xl font-semibold text-dark">Información Personal</h2>
            <p className="text-body text-sm">Actualiza tus datos personales y mantén tu perfil al día</p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-dark">Nombre</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Tu nombre" 
                          {...field} 
                          className="bg-white/50 backdrop-blur-sm border-stroke focus:border-primary transition-colors duration-200"
                        />
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
                      <FormLabel className="text-dark">Email</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="tu@email.com" 
                          {...field} 
                          className="bg-white/50 backdrop-blur-sm border-stroke focus:border-primary transition-colors duration-200"
                        />
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
                      <FormLabel className="text-dark">Fecha de Nacimiento</FormLabel>
                      <FormControl>
                        <Input 
                          type="date" 
                          {...field} 
                          className="bg-white/50 backdrop-blur-sm border-stroke focus:border-primary transition-colors duration-200"
                        />
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
                      <FormLabel className="text-dark">Género</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-white/50 backdrop-blur-sm border-stroke focus:border-primary transition-colors duration-200">
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
                      <FormLabel className="text-dark">Teléfono</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Tu teléfono" 
                          {...field} 
                          className="bg-white/50 backdrop-blur-sm border-stroke focus:border-primary transition-colors duration-200"
                        />
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
                      <FormLabel className="text-dark">Documento</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Tu documento" 
                          {...field} 
                          className="bg-white/50 backdrop-blur-sm border-stroke focus:border-primary transition-colors duration-200"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-4 pt-4">
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-custom text-white hover:opacity-90 transition-all duration-300 transform hover:scale-[1.02] shadow-solid-7 h-12 text-base font-medium"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Guardando...
                    </div>
                  ) : 'Guardar Cambios'}
                </Button>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button
                    type="button"
                    className="w-full bg-gradient-to-r from-gradient-start via-gradient-middle to-gradient-end text-white hover:opacity-90 transition-all duration-300 transform hover:scale-[1.02] shadow-solid-7 h-12"
                    onClick={() => window.open('https://wa.me/1234567890', '_blank')}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    WhatsApp
                  </Button>

                  <Button
                    type="button"
                    className="w-full bg-primary hover:bg-primary-hover text-white transition-all duration-300 transform hover:scale-[1.02] shadow-solid-5 h-12"
                    onClick={() => window.open('mailto:soporte@ejemplo.com', '_blank')}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                    </svg>
                    Email
                  </Button>

                  <Button
                    type="button"
                    className="w-full bg-secondary hover:bg-primaryho text-white transition-all duration-300 transform hover:scale-[1.02] shadow-solid-5 h-12"
                    onClick={() => window.open('/faq', '_blank')}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"/>
                    </svg>
                    FAQ
                  </Button>
                </div>

                <div className="flex flex-col gap-4 pt-4">
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="destructive"
                        className="w-full h-12"
                        disabled={isDeleting}
                      >
                        {isDeleting ? (
                          <div className="flex items-center justify-center">
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Eliminando...
                          </div>
                        ) : 'Eliminar Cuenta'}
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="bg-white/90 backdrop-blur-sm">
                      <AlertDialogHeader>
                        <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Esta acción no se puede deshacer. Se eliminará permanentemente tu cuenta y todos sus datos asociados.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel className="bg-white/50 backdrop-blur-sm border-stroke hover:bg-white/70">Cancelar</AlertDialogCancel>
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
                    className="w-full h-12 p-4 text-red-600 font-medium hover:bg-red-50 rounded-lg transition-colors duration-200"
                    onClick={handleLogout}
                  >
                    Cerrar Sesión
                  </button>

                  <Button
                    type="button"
                    variant="ghost"
                    className="w-full h-12 text-body hover:text-primary hover:bg-primary/5 transition-colors duration-200"
                    onClick={() => window.open('/terms', '_blank')}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Términos y Condiciones
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  )
} 