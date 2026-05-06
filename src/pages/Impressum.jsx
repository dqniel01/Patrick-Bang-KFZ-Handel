export default function Impressum() {
  return (
    <>
      <section className="pt-32 pb-16 bg-gray-950 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="font-display text-5xl font-bold">Impressum</h1>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-6 prose prose-sm text-gray-600">
          <h2 className="font-display text-2xl font-bold text-gray-900 mb-4">Angaben gemäß § 5 TMG</h2>
          <p>
            Patrick Bang<br />
            KFZ-Handel<br />
            [Straße und Hausnummer]<br />
            [PLZ Ort]
          </p>

          <h3 className="font-display text-xl font-bold text-gray-900 mt-8 mb-3">Kontakt</h3>
          <p>
            Telefon: [Telefonnummer]<br />
            E-Mail: [E-Mail-Adresse]
          </p>

          <h3 className="font-display text-xl font-bold text-gray-900 mt-8 mb-3">Gewerbeanmeldung</h3>
          <p>
            Die Gewerbeanmeldung wurde bei [zuständige Behörde] vorgenommen.<br />
            Gewerberegisternummer: [Nummer]
          </p>

          <h3 className="font-display text-xl font-bold text-gray-900 mt-8 mb-3">Umsatzsteuer-ID</h3>
          <p>
            Umsatzsteuer-Identifikationsnummer gemäß § 27a Umsatzsteuergesetz:<br />
            DE[Nummer]
          </p>

          <h3 className="font-display text-xl font-bold text-gray-900 mt-8 mb-3">Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h3>
          <p>
            Patrick Bang<br />
            [Anschrift wie oben]
          </p>

          <h3 className="font-display text-xl font-bold text-gray-900 mt-8 mb-3">Haftungsausschluss</h3>
          <p>
            Die Inhalte dieser Seite wurden mit größter Sorgfalt erstellt. Für die Richtigkeit,
            Vollständigkeit und Aktualität der Inhalte kann jedoch keine Gewähr übernommen werden.
          </p>
          <p className="mt-2 text-xs text-gray-400">
            Hinweis: Kontakt- und Adressdaten werden zeitnah ergänzt. Bei Fragen wenden Sie sich
            bitte direkt über AutoScout24 an den Händler.
          </p>
        </div>
      </section>
    </>
  )
}
