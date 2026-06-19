import Header from '../components/Header';

export default function CartConfirmation() {
  return (
    <>
      <Header />
      <main className="px-container-margin py-8 max-w-2xl mx-auto">
        <h2 className="font-headline-md text-headline-md text-on-surface mb-8">
          Votre Panier
        </h2>
        <p className="text-on-surface-variant font-body-md">
          Page panier — sera convertie depuis le HTML dans la Phase 2.
        </p>
      </main>
    </>
  );
}
