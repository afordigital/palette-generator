interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return <main className="max-w-screen-xl p-5 mx-auto">{children}</main>;
}
