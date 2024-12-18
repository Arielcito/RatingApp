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
  const { subscriber } = useSubscriber()
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: async () => {
      try {
        const response = await fetch('https://ratingapp.net.ar:18000/subscriptors/getSubscriber', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: subscriber?.id })
        })
        
        if (!response.ok) throw new Error('Error fetching profile')
        const data: Subscriber = await response.json()
        
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

      const response = await fetch('https://ratingapp.net.ar:18000/subscriptors/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!response.ok) throw new Error('Error al actualizar perfil')

      const updatedData = await response.json()
      if (updatedData) {
        toast.success('Perfil actualizado correctamente')
        router.refresh()
      }
    } catch (error) {
      toast.error('Error al actualizar el perfil')
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
          name="birthDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fecha de Nacimiento</FormLabel>
              <FormControl>
                <Input {...field} type="date" />
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
              <Select 
                onValueChange={field.onChange} 
                value={field.value}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue />
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
                <Input {...field} type="tel" />
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
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Actualizando...' : 'Actualizar Perfil'}
        </Button>
      </form>
    </Form>
  )
} 