import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { toast } from 'sonner'
import { Link, useNavigate } from 'react-router-dom'

const signUp = z.object({
  restaurantName: z.string(),
  managerName: z.string(),
  phone: z.string(),
  email: z.string().email(),
})

type SignUpForm = z.infer<typeof signUp>

export function SignUp() {
  const { register, handleSubmit, formState } = useForm<SignUpForm>({})
  const navigate = useNavigate()
  async function handleSignUp(data: SignUpForm) {
    console.log(data)
    toast.success('Enviamos um link', {
      action: {
        label: 'Login',
        onClick: () => navigate('sign-in'),
      },
    })
    await new Promise((resolve) => setTimeout(resolve, 2000))
  }

  return (
    <div>
      <Button asChild variant="ghost" className="absolute right-8 top-8">
        <Link to={'/sign-in'}>Fazer login</Link>
      </Button>
      <Helmet title="Cadastro" />
      <div className="p-8">
        <div className="w-[350px] flex flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Criar conta grátis
            </h1>
            <p className="text-sm text-muted-foreground">
              Seja um parceiro e comece suas vendas
            </p>
          </div>
          <form onSubmit={handleSubmit(handleSignUp)} className="space-y-4">
            <div className="space-y-2">
              <Label>Nome do estabelecimento</Label>
              <Input
                id="restaurantName"
                type="text"
                {...register('restaurantName')}
              />
            </div>
            <div className="space-y-2">
              <Label>Seu nome</Label>
              <Input
                id="managerName"
                type="text"
                {...register('managerName')}
              />
            </div>
            <div className="space-y-2">
              <Label>Seu e-mail</Label>
              <Input id="email" type="email" {...register('email')} />
            </div>
            <div className="space-y-2">
              <Label>Seu celular</Label>
              <Input id="phone" type="text" {...register('phone')} />
            </div>
            <Button
              disabled={formState.isSubmitting}
              className="w-full"
              type="submit"
            >
              Finalizar Cadastro
            </Button>

            <p className="px-6 text-center text-sm loading-relaxed text-muted-foreground">
              Ao continuar voce concorda com nossos termos de serviços e
              políticas de privacidade.
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}
