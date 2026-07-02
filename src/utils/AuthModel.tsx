import { Button } from "@/components/ui/button"
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
    CloseButton
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react";

export default function AuthModel({ onClose }: { onClose: () => void }) {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <Card className="w-full max-w-sm relative shadow-xl">
            <CloseButton className="absolute right-4 top-4" onClick={onClose} />
            <CardHeader>
                <CardTitle>
                    {isLogin ? "Login to your account" : "Sign up for an account"}</CardTitle>
                <CardDescription>
                    {isLogin ? "Enter your email below to login to your account" : "Enter your email below to sign up for an account"}
                </CardDescription>
                <CardAction>
                    {isLogin ?
                        (<Button type="button" onClick={() => setIsLogin(false)} variant="link">Sign Up</Button>) :
                        (<Button type="button" onClick={() => setIsLogin(true)} variant="link">Login</Button>)
                    }
                </CardAction>
            </CardHeader>
            <CardContent>
                <form>
                    <div className="flex flex-col gap-6">
                        {!isLogin ?
                            <div className="grid gap-2">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    placeholder="John Doe"
                                    required
                                />
                            </div>
                            :
                            null
                        }
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="m@example.com"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <div className="flex items-center">
                                <Label htmlFor="password">Password</Label>
                                {isLogin ?
                                    <a
                                        href="#"
                                        onClick={(e) => { e.preventDefault(); setIsLogin(false); }}
                                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                                    >
                                        Forgot your password?
                                    </a> : null
                                }
                            </div>
                            <Input id="password" type="password" required />
                        </div>
                    </div>
                </form>
            </CardContent>
            <CardFooter className="flex-col gap-2">
                <Button type="submit" className="w-full">
                    {isLogin ? "Login" : "Sign Up"}
                </Button>
                <Button type="button" variant="outline" className="w-full">
                    {isLogin ? "Login with Google" : "Sign up with Google"}
                </Button>
            </CardFooter>
        </Card>
    )
}
