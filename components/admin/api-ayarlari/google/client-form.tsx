'use client'

import { useFormState, useFormStatus } from 'react-dom'
import { useToast } from "@/components/ui/use-toast"
import { useEffect } from 'react'

function SubmitButton() {
  const { pending } = useFormStatus()
  
  return (
    <button 
      type="submit" 
      disabled={pending}
      className={`w-full p-2 text-white rounded ${pending ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'}`}
    >
      {pending ? 'İşlem yapılıyor...' : 'Kaydet'}
    </button>
  )
}

export default function ClientForm({ currentForm, handleSubmit }) {
  const { toast } = useToast()
  const initialState = { message: null, success: null }
  const [state, formAction] = useFormState(handleSubmit, initialState)

  useEffect(() => {
    if (state.message) {
      toast({
        title: state.success ? "Başarılı" : "Hata",
        description: state.message,
        variant: state.success ? "default" : "destructive",
      })
    }
  }, [state, toast])

  return (
    <form action={formAction} className="space-y-6 p-4 border rounded shadow-md">
      {currentForm && <input type="hidden" name="id" value={currentForm.id} />}
      <div>
        <label htmlFor="googleVerificationCode" className="block mb-2">
          Google Site Doğrulama Kodu
        </label>
        <input
          id="googleVerificationCode"
          type="text"
          name="googleVerificationCode"
          placeholder="Google Site Doğrulama Kodu"
          required
          className="w-full p-2 border rounded"
          defaultValue={currentForm?.googleVerificationCode || ""}
        />
      </div>

      <div>
        <label htmlFor="googleAnalyticsCode" className="block mb-2">
          Google Analytics Kodu
        </label>
        <textarea
          id="googleAnalyticsCode"
          name="googleAnalyticsCode"
          placeholder="Google Analytics Kodu"
          required
          className="w-full p-2 border rounded"
          defaultValue={currentForm?.googleAnalyticsCode || ""}
        />
      </div>

      <div>
        <label htmlFor="captchaSiteKey" className="block mb-2">
          reCAPTCHA Site Anahtarı
        </label>
        <input
          id="captchaSiteKey"
          type="text"
          name="captchaSiteKey"
          placeholder="reCAPTCHA Site Anahtarı"
          required
          className="w-full p-2 border rounded"
          defaultValue={currentForm?.captchaSiteKey || ""}
        />
      </div>

      <SubmitButton />
    </form>
  )
}