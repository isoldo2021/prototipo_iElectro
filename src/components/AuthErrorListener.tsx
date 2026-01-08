'use client';

import { useEffect } from 'react';
import { errorEmitter } from '@/firebase/error-emitter';
import { useToast } from '@/hooks/use-toast';
import type { FirebaseError } from 'firebase/app';

function getFriendlyAuthErrorMessage(errorCode: string): string {
    switch (errorCode) {
        case 'auth/invalid-credential':
            return 'Las credenciales son incorrectas. Por favor, verifica tu correo y contraseña.';
        case 'auth/email-already-in-use':
            return 'Este correo electrónico ya está en uso. Por favor, intenta iniciar sesión.';
        case 'auth/weak-password':
            return 'La contraseña es demasiado débil. Debe tener al menos 6 caracteres.';
        case 'auth/user-not-found':
            return 'No se encontró ningún usuario con este correo electrónico.';
        case 'auth/wrong-password':
            return 'La contraseña es incorrecta.';
        default:
            return 'Ocurrió un error de autenticación. Por favor, inténtalo de nuevo.';
    }
}


export function AuthErrorListener() {
  const { toast } = useToast();

  useEffect(() => {
    const handleAuthError = (error: FirebaseError) => {
      console.error("Auth Error Captured:", error.code, error.message);
      toast({
        variant: "destructive",
        title: "Error de Autenticación",
        description: getFriendlyAuthErrorMessage(error.code),
      });
    };

    errorEmitter.on('auth-error', handleAuthError);

    return () => {
      errorEmitter.off('auth-error', handleAuthError);
    };
  }, [toast]);

  return null;
}
