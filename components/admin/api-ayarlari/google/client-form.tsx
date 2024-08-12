'use client'

import { useFormState, useFormStatus } from 'react-dom'
import { useToast } from "@/components/ui/use-toast"
import { useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { googleFormSchema, GoogleFormData } from "@/schemas/apiAyarlariSchema"

interface FormState {
  message: string | null;
  success: boolean | null;
  errors: Partial<Record<keyof GoogleFormData, string[]>>;
}

interface ClientFormProps {
  currentForm: GoogleFormData | null;
  handleSubmit: (prevState: FormState, formData: FormData) => Promise<FormState>;
}

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? 'Kaydediliyor...' : 'Kaydet'}
    </Button>
  )
}

export default function ClientForm({ currentForm, handleSubmit }: ClientFormProps) {
  const { toast } = useToast()
  const initialState: FormState = { message: null, success: null, errors: {} }
  const [state, formAction] = useFormState(handleSubmit, initialState)

  useEffect(() => {
    console.log("Current state:", state);
    if (state.message) {
      toast({
        title: state.success ? "Başarılı" : "Hata",
        description: state.message,
        variant: state.success ? "default" : "destructive",
      })
    }
  }, [state, toast])

  return (
    <Card className="w-full min-w-full">
      <CardHeader>
        <CardTitle>API Ayarları</CardTitle>
      </CardHeader>
      <form action={formAction}>
        <CardContent className="space-y-4">
          {currentForm && <input type="hidden" name="id" value={currentForm.id} />}
          <div className="space-y-2">
            <Label htmlFor="googleVerificationCode">Google Site Doğrulama Kodu</Label>
            <Input
              id="googleVerificationCode"
              name="googleVerificationCode"
              placeholder="Google Site Doğrulama Kodu"
              defaultValue={currentForm?.googleVerificationCode || ""}
            />
            {state.errors.googleVerificationCode && (
              <p className="text-red-500 text-sm mt-1">{state.errors.googleVerificationCode[0]}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="googleAnalyticsCode">Google Analytics Kodu</Label>
            <Textarea
              id="googleAnalyticsCode"
              name="googleAnalyticsCode"
              placeholder="Google Analytics Kodu"
              defaultValue={currentForm?.googleAnalyticsCode || ""}
            />
            {state.errors.googleAnalyticsCode && (
              <p className="text-red-500 text-sm mt-1">{state.errors.googleAnalyticsCode[0]}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="captchaSiteKey">reCAPTCHA Site Anahtarı</Label>
            <Input
              id="captchaSiteKey"
              name="captchaSiteKey"
              placeholder="reCAPTCHA Site Anahtarı"
              defaultValue={currentForm?.captchaSiteKey || ""}
            />
            {state.errors.captchaSiteKey && (
              <p className="text-red-500 text-sm mt-1">{state.errors.captchaSiteKey[0]}</p>
            )}
          </div>
          
          <Separator className="my-4" />
          
          <div className="space-y-2">
            <Label htmlFor="microsoftClarityCode">Microsoft Clarity Kodu</Label>
            <Input
              id="microsoftClarityCode"
              name="microsoftClarityCode"
              placeholder="Microsoft Clarity Kodu"
              defaultValue={currentForm?.microsoftClarityCode || ""}
            />
            {state.errors.microsoftClarityCode && (
              <p className="text-red-500 text-sm mt-1">{state.errors.microsoftClarityCode[0]}</p>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <SubmitButton />
        </CardFooter>
      </form>
    </Card>
  )
}