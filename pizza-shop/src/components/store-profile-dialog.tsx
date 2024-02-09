/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Button } from './ui/button'
import {
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from './ui/dialog'
import { DialogDescription, DialogTitle } from '@radix-ui/react-dialog'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getManagedRestaurant } from '@/api/get-manager-restaurant'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import updateProfile from '@/api/update-profile'
import { toast } from 'sonner'

const storeProfileSchema = z.object({
  name: z.string().min(1),
  description: z.string(),
})

type StoreProfileSchema = z.infer<typeof storeProfileSchema>

export function StoreProfileDialog() {
  const queryClient = useQueryClient()
  const { data: managedRestaurant } = useQuery({
    queryKey: ['managedRestaurant'],
    queryFn: getManagedRestaurant,
    staleTime: Infinity,
  })
  function updateManagedRestaurantCache({
    name,
    description,
  }: {
    name: string
    description: string | null
  }) {
    const cached = queryClient.getQueryData(['managed-restaurant'])
    if (cached) {
      queryClient.setQueryData(['managed-restaurant'], {
        ...cached,
        name,
        description,
      })
    }
    return cached
  }

  const { mutateAsync: updateProfileFn } = useMutation({
    mutationFn: updateProfile,
    onMutate: ({ description, name }) => {
      // @ts-ignore
      const { cached } = updateManagedRestaurantCache({ description, name })
      return { previousProfile: cached }
    },
    onError: (_, __, context) => {
      if (context?.previousProfile) {
        updateManagedRestaurantCache(context.previousProfile)
      }
    },
  })
  async function handleUpdateProfile(data: StoreProfileSchema) {
    try {
      await updateProfileFn({
        name: data.name,
        description: data.description,
      })
      toast.success('Perfil atualizado com sucesso!')
    } catch {
      toast.error('Falha ao atualizar o perfil, tente novamente')
    }
  }
  const { register, handleSubmit, formState } = useForm<StoreProfileSchema>({
    resolver: zodResolver(storeProfileSchema),
    values: {
      name: managedRestaurant?.name ?? '',
      description: managedRestaurant?.description ?? '',
    },
  })
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Perfil da loja</DialogTitle>
        <DialogDescription>
          Atualize as informações do seu estabelecimento visíveis a seu cliente
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit(handleUpdateProfile)}>
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right" htmlFor="name">
              Nome
            </Label>
            <Input className="col-span-3" id="name" {...register('name')} />
          </div>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label className="text-right" htmlFor="description">
            Descrição
          </Label>
          <Textarea
            className="col-span-3"
            id="description"
            {...register('description')}
          />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant={'ghost'} type="button">
              Cancelar
            </Button>
          </DialogClose>
          <Button
            type="submit"
            variant={'success'}
            disabled={formState.isSubmitting}
          >
            Salvar
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  )
}
