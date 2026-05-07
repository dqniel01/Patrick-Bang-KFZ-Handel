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
              E-Mail: patrick.bang@icloud.com<br />
              Telefon: +49 170 2972977
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold text-gray-900 mb-3">3. Hosting</h2>
            <p>
              Diese Website wird bei einem externen Dienstleister gehostet. Beim Aufruf der Website werden
              automatisch Verbindungsdaten (IP-Adresse, Browsertyp, Betriebssystem, Uhrzeit des Abrufs)
              im sogenannten Server-Log gespeichert. Diese Daten sind technisch erforderlich, um die Website
              bereitzustellen, und werden nicht mit anderen Datenquellen zusammengeführt.
            </p>
            <p className="mt-2">
              Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse am sicheren Betrieb der Website).
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold text-gray-900 mb-3">4. Cookies und lokale Speicherung</h2>

            <h3 className="font-semibold text-gray-800 mb-2">Cookie-Einwilligung</h3>
            <p>
              Beim ersten Besuch dieser Website wird Ihre Entscheidung zur Cookie-Nutzung (Akzeptieren oder Ablehnen)
              im lokalen Speicher Ihres Browsers (localStorage) gespeichert. Dabei werden keine personenbezogenen
              Daten an uns übermittelt. Der Eintrag dient ausschließlich dazu, Ihre Einwilligung zu dokumentieren
              und den Banner beim nächsten Besuch nicht erneut anzuzeigen.
            </p>

            <h3 className="font-semibold text-gray-800 mt-4 mb-2">Spracheinstellung</h3>
            <p>
              Ihre gewählte Sprache (Deutsch, Italienisch, Französisch oder Spanisch) wird ebenfalls im
              localStorage gespeichert, damit sie beim nächsten Besuch erhalten bleibt. Es werden dabei
              keine personenbezogenen Daten verarbeitet.
            </p>

            <p className="mt-3">
              Sie können den lokalen Browserspeicher jederzeit in den Einstellungen Ihres Browsers löschen.
            </p>
            <p className="mt-2">
              Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse) für technisch notwendige
              Speicherung; Art. 6 Abs. 1 lit. a DSGVO (Einwilligung) für optionale Drittanbieter-Inhalte.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold text-gray-900 mb-3">5. Datenerfassung auf dieser Website</h2>

            <h3 className="font-semibold text-gray-800 mb-2">Kontaktformular</h3>
            <p>
              Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben (Name, E-Mail-Adresse,
              Telefonnummer, Fahrzeugreferenz und Nachricht) zwecks Bearbeitung der Anfrage gespeichert und
              verarbeitet. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.
            </p>
            <p className="mt-2">
              Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung/vorvertragliche Maßnahmen)
              bzw. Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse).
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold text-gray-900 mb-3">6. Einbindung von AutoScout24</h2>
            <p>
              Auf der Seite „Fahrzeuge" binden wir Inhalte von AutoScout24 (Burda Digital GmbH & Co. KG,
              St.-Martin-Straße 66, 81541 München) per iFrame ein. Dies geschieht nur dann, wenn Sie der
              Cookie-Nutzung auf dieser Website zugestimmt haben.
            </p>
            <p className="mt-2">
              Durch die Einbindung kann AutoScout24 Ihre IP-Adresse sowie weitere Browserdaten erfassen
              und eigene Cookies setzen. Wir haben keinen Einfluss auf die Datenverarbeitung durch AutoScout24.
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
            <p className="mt-2">
              Rechtsgrundlage: Art. 6 Abs. 1 lit. a DSGVO (Einwilligung).
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold text-gray-900 mb-3">7. Externe Links</h2>
            <p>
              Diese Website enthält weitere Links zu AutoScout24. Beim Aufruf dieser externen Links gelten
              ausschließlich die Datenschutzbestimmungen von AutoScout24. Wir haben keinen Einfluss auf die
              Datenerhebung bei Drittanbietern.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold text-gray-900 mb-3">8. Ihre Rechte</h2>
            <p>Sie haben gegenüber uns folgende Rechte hinsichtlich Ihrer personenbezogenen Daten:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Recht auf Auskunft (Art. 15 DSGVO)</li>
              <li>Recht auf Berichtigung (Art. 16 DSGVO)</li>
              <li>Recht auf Löschung (Art. 17 DSGVO)</li>
              <li>Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
              <li>Recht auf Datenübertragbarkeit (Art. 20 DSGVO)</li>
              <li>Recht auf Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)</li>
              <li>Recht auf Widerruf einer erteilten Einwilligung (Art. 7 Abs. 3 DSGVO)</li>
            </ul>
            <p className="mt-3">
              Zur Ausübung Ihrer Rechte wenden Sie sich bitte an: patrick.bang@icloud.com
            </p>
            <p className="mt-2">
              Außerdem haben Sie das Recht, sich bei einer Datenschutz-Aufsichtsbehörde über die
              Verarbeitung Ihrer personenbezogenen Daten zu beschweren.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold text-gray-900 mb-3">9. Aktualität dieser Erklärung</h2>
            <p>
              Diese Datenschutzerklärung hat den Stand Mai 2026. Wir behalten uns vor, sie bei Bedarf
              anzupassen, um der aktuellen Rechtslage zu entsprechen.
            </p>
          </div>

        </div>
      </section>
    </>
  )
}
