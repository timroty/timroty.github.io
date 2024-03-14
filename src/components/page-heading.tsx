interface Props {
  children: string;
}

export default function PageHeading({ children }: Props) {
  return <h1 className="text-4xl font-bold  mt-14">{children}</h1>;
}
