export default function Datenschutz() {
  return (
    <>
      <section className="pt-32 pb-16 bg-gray-950 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="font-display text-5xl font-bold">Datenschutzerklärung</h1>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-6 space-y-8 text-sm text-gray-600 leading-relaxed">
          <div>
            <h2 className="font-display text-2xl font-bold text-gray-900 mb-3">1. Datenschutz auf einen Blick</h2>
            <p>
              Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen
              Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit
              denen Sie persönlich identifiziert werden können.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold text-gray-900 mb-3">2. Verantwortliche Stelle</h2>
            <p>
              Verantwortlich für die Datenverarbeitung auf dieser Website ist:<br /><br />
              Patrick Bang KFZ-Handel<br />
              [Anschrift]<br />
              [PLZ Ort]<br />
              E-Mail: [E-Mail-Adresse]
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold text-gray-900 mb-3">3. Datenerfassung auf dieser Website</h2>
            <h3 className="font-semibold text-gray-800 mb-2">Kontaktformular</h3>
            <p>
              Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem
              Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung
              der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben
              wir nicht ohne Ihre Einwilligung weiter.
            </p>
            <p className="mt-3">
              Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung/vorvertragliche Maßnahmen)
              bzw. Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse).
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold text-gray-900 mb-3">4. Externe Links</h2>
            <p>
              Diese Website enthält Links zu AutoScout24 (Burda Digital GmbH & Co. KG). Beim Aufruf
              dieser externen Links gelten die Datenschutzbestimmungen von AutoScout24. Wir haben keinen
              Einfluss auf die Datenerhebung bei Drittanbietern.
            </p>
            <p className="mt-2">
              Datenschutzerklärung AutoScout24:{' '}
              <a
                href="https://www.autoscout24.de/informationen/datenschutz"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-900 underline underline-offset-2"
              >
                autoscout24.de/informationen/datenschutz
              </a>
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold text-gray-900 mb-3">5. Ihre Rechte</h2>
            <p>
              Sie haben jederzeit das Recht auf unentgeltliche Auskunft über Ihre gespeicherten
              personenbezogenen Daten, deren Herkunft und Empfänger und den Zweck der Datenverarbeitung
              sowie ein Recht auf Berichtigung oder Löschung dieser Daten. Hierzu sowie zu weiteren
              Fragen zum Thema Datenschutz können Sie sich jederzeit an uns wenden.
            </p>
          </div>

          <div className="bg-gray-50 border border-gray-200 p-5 rounded text-xs text-gray-400">
            Diese Datenschutzerklärung wird zeitnah durch einen vollständigen und rechtssicheren
            Text ersetzt. Bei Fragen wenden Sie sich bitte direkt an den Websitebetreiber.
          </div>
        </div>
      </section>
    </>
  )
}
