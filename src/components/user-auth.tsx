
'use client';

import {
  useAuth,
  useUser,
} from '@/firebase';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LogOut, User as UserIcon } from 'lucide-react';
import { Skeleton } from './ui/skeleton';

export function UserAuth() {
  const { user, isUserLoading } = useUser();
  const auth = useAuth();

  const handleSignOut = async () => {
    await auth.signOut();
  };
  
  if (isUserLoading) {
    return <Skeleton className="h-8 w-8 rounded-full" />;
  }

  if (!user) {
    return (
      <Button asChild variant="ghost" className="flex-col items-center h-auto px-2 py-1">
        <Link href="/login">
            <UserIcon className="h-6 w-6"/>
            <span className="text-xs">Mi cuenta</span>
        </Link>
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex-col items-center h-auto px-2 py-1">
            <Avatar className="h-6 w-6">
                <AvatarImage src={user.photoURL ?? ''} alt={user.displayName ?? 'Usuario'} />
                <AvatarFallback>
                {user.email ? user.email.charAt(0).toUpperCase() : <UserIcon />}
                </AvatarFallback>
            </Avatar>
            <span className="text-xs">Mi cuenta</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {user.displayName ?? 'Mi Cuenta'}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Cerrar Sesión</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
