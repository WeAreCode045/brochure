
import { SupabaseProvider } from '@/providers/SupabaseProvider';

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>
                <SupabaseProvider>
                    {children}
                </SupabaseProvider>
            </body>
        </html>
    );
}
