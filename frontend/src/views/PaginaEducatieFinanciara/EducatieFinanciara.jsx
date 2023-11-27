import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Image } from 'react-bootstrap';
import importanta from '../images/importanta_ed_finan.jpg';
import educatie from '../images/educatie.jpg';
import sfat from '../images/sfat.jpg';
import chal1 from '../images/sfat.jpg';
import "./EducatieFinanciara.scss";

const EducatieFinanciara = () => {
    const [selectedSection, setSelectedSection] = useState('');

    const sections = [
        { title: 'Importanța educației financiare', id: 'importanta-financiara' },
        { title: 'Explorând Lumea Financiară', id: 'explorand-financiara' },
        { title: 'Sfaturi utile', id: 'sfaturi-utile' },
        { title: 'Intrebari frecvente', id: 'intrebari-frecvente' },
        { title: 'Challenges', id: 'challenges' },
    ];

    const handleSectionClick = (id) => {
        setSelectedSection(id);
    };

    return (
        <div className='container-pp mt-5' >
            <div className="ed-container d-flex flex-column justify-content-center align-items-center p-3 mb-2 text-white">
                <h1>Dă start educației tale financiare</h1>
                <p>Într-o lume complexă și în continuă schimbare, educația financiară devine din ce în ce mai importantă. De la gestionarea bugetului personal la investiții și planificarea pentru viitor, abilitățile financiare pot face diferența între o viață financiară prosperă și una plină de griji.</p>
            </div>

            <div className="d-flex flex-row justify-content-center align-items-center">
                {sections.map((section) => (
                    <div key={section.id}>
                        <Button className="btn-ed m-2" onClick={() => handleSectionClick(section.id)}>{section.title}</Button>
                    </div>
                ))}

            </div>

            {selectedSection === 'importanta-financiara' && (
                <div className='secti d-flex flex-row justify-content-center align-items-center m-4' >
                    <div className='img-secti'>
                        <Image className='img-secti-poza' src={importanta} />
                    </div>

                    <div className='text-secti'>
                        <b>Cum te ajută educația financiară făcută la școală și în familie să ajungi un adult echilibrat și autonom</b>

                        <p>Nu poți deveni independent financiar fără educație financiară. Așa cum este important să înțelegem cum funcționează organismul nostru și care sunt condițiile necesare pentru a ne bucura de o stare de bine la nivel fizic, este la fel de important să înțelegem și mecanismele care ne asigură sănătatea financiară.
                            Și, ca în orice aspect al vieții noastre, totul pornește de la cunoaștere și informație. </p>
                        <b>Ce este educația financiară?</b>

                        <p>
                            Educația financiară reprezintă un set de cunoștințe și abilități care-ți permit să-ți gestionezi mai bine banii și să participi la viața economică.
                            Consiliul OCDE (Organizația pentru Cooperare și Dezvoltare Economică) a definit educația financiară ca fiind o „combinație de conștientizare financiară, cunoștințe, abilități, atitudini și comportamente, necesare pentru a lua decizii financiare bune și, în cele din urmă, pentru a atinge bunăstarea financiară individuală“.
                            Dobândirea alfabetizării financiare îți permite să-ți îmbunătățești și să-ți menții bunăstarea financiară, oferindu-ți o bază solidă pentru:

                            <ul>
                                <li>A fi mai atent la riscuri și oportunități financiare, înțelegând produsele financiare și profitând de ele;</li>
                                <li>A face alegeri financiare, în deplină cunoștință de cauză;</li>
                                <li>A ști unde să găsești asistență financiară;</li>
                                <li>A avea inițiative eficiente pentru situația ta financiară;</li>
                                <li>A înțelege contextul financiar al unei anumite perioade;</li>
                                <li>A lua decizii financiare corecte, în funcție de propriul context și de propriile obiective de viață;</li>
                                <li>A-ți gestiona și planifica mai bine bugetul.</li>
                            </ul>

                            Așa cum spuneam, educația financiară este benefică la orice vârstă, fie că e vorba de copii, de tineri aflați la început de drum sau de adulți cu responsabilități. Pentru că pe an ce trece, domeniul financiar devine din ce în ce mai complex, iar digitalizarea ne încurajează să fim din ce în ce mai autonomi când vine vorba de finanțele noastre.
                        </p>
                    </div>

                </div>
            )}
            {selectedSection === 'explorand-financiara' && (
                <div className='secti d-flex flex-row justify-content-center align-items-center m-4'>

                    <div className='img-secti'>

                        <Image className='img-secti-poza' src={educatie} />

                    </div>

                    <div className='text-secti'>

                        <p>Înainte de a păși pe calea educației financiare, este important să înțelegem conceptele și principiile de bază care stau la baza gestionării banilor și a finanțelor personale.</p>

                        <ul><b> Elemente de baza:  </b></ul>
                        <li> <b> Buget: </b> Un plan financiar care estimează veniturile și cheltuielile pentru o anumită perioadă de timp. Bugetul vă ajută să vă gestionați banii eficient și să vă atingeți obiectivele financiare.
                        </li>
                        <li> <b> Rată a dobânzii: </b> Costul perceput de către creditor pentru împrumutul de bani. Aceasta se exprimă sub formă de procent și variază în funcție de tipul de împrumut sau cont.
                        </li>
                        <li> <b> Investiție: </b> Plasarea banilor în active cu scopul de a obține profit sau câștig pe termen lung. Investițiile pot include acțiuni, obligațiuni, imobiliare și multe altele.
                        </li>
                        <li> <b> Diversificare: </b> Strategia de a investi într-o varietate de active pentru a reduce riscul. Diversificarea vă ajută să evitați expunerea excesivă la un anumit tip de investiție.
                        </li>
                        <li> <b> Datorie: </b> Suma de bani pe care o datorezi unei alte persoane sau entități. Acest lucru poate include împrumuturi personale, datorii de card de credit sau ipoteci.
                        </li>
                        <li> <b> Punct de echilibru: </b> Nivelul de vânzări la care veniturile acoperă toate cheltuielile, fără a genera profit sau pierdere. Punctul de echilibru este important pentru afaceri.
                        </li>
                        <li> <b> Inflație: </b> Creșterea generală a prețurilor bunurilor și serviciilor în economie, ceea ce reduce puterea de cumpărare a banilor.
                        </li>
                        <li> <b> Economisire: </b> Acțiunea de a pune bani deoparte pentru viitor, de obicei într-un cont de economii sau o investiție sigură.
                        </li>
                        <li> <b> Active lichide: </b> Active pe care le puteți converti rapid în bani, cum ar fi numerarul și conturile bancare.
                        </li>
                        <li> <b> Portofoliu: </b> O colecție de investiții, cum ar fi acțiuni, obligațiuni și alte active, deținute de un investitor.</li>

                    </div>


                </div>
            )}
            {selectedSection === 'sfaturi-utile' && (
                <div className='secti d-flex flex-row justify-content-center align-items-center m-4'>

                    <div className='img-secti'>
                        <Image className='img-secti-poza' src={sfat} />
                    </div>

                    <div className='text-secti'>
                        <p> <b> Sfaturi pentru cheltuieli</b> </p>

                        <ol>

                            <li> <b> Creează un Buget: </b> Primul pas pentru o gestionare eficientă a cheltuielilor este să creezi un buget. Înregistrează-ți veniturile și cheltuielile lunare pentru a avea o vedere de ansamblu asupra finanțelor tale.
                            </li>
                            <li> <b> Prioritizează Cheltuielile: </b> Identifică cheltuielile esențiale, cum ar fi locuința, facturile, hrana și transportul, și acordă-le prioritate în bugetul tău. Alocă mai întâi bani pentru aceste cheltuieli înainte de a cheltui pe alte lucruri.
                            </li>
                            <li> <b> Evită Cheltuielile Impulsive: </b> Gândește-te bine înainte de a face cumpărături și evită achizițiile impulsive. Poți să folosești o listă de cumpărături pentru a te ajuta să te concentrezi pe nevoile tale reale.
                            </li>
                            <li> <b> Compară Prețurile: </b> Comparați prețurile și căutați oferte și reduceri înainte de a face cumpărături. Achiziționarea la prețuri competitive poate să economisească bani pe termen lung.
                            </li>
                            <li> <b> Renunță la Abonamentele Inutile: </b> Analizează-ți abonamentele și serviciile și renunță la cele pe care nu le folosești sau le poți obține mai ieftin în altă parte.
                            </li>
                            <li> <b> Plătește Facturile la Timp: </b> Evită penalitățile și dobânzile suplimentare prin plata facturilor la timp. Poți să setezi alerte pentru a-ți aminti de termenele limită.
                            </li>
                            <li> <b> Pregătește-ți Mesele Acasă: </b> Gătirea acasă este adesea mai ieftină decât a mânca în oraș sau a comanda mâncare. Planifică-ți mesele și cumpărăturiță cu atenție pentru a economisi bani.
                            </li>
                            <li> <b> Economisește la Transport: </b> Caută modalități de a economisi la transport, cum ar fi folosirea transportului public, car-sharing sau mersul pe jos și cu bicicleta pentru distanțe scurte.
                            </li>
                            <li> <b> Stabilește un Fond de Urgență: </b> Creează un fond de urgență pentru a face față neprevăzutelor. Acest lucru te poate ajuta să eviți să folosești cardul de credit pentru cheltuieli neprevăzute.
                            </li>
                            <li> <b> Monitorizează-ți Cheltuielile: </b> Urmează-ți regulat cheltuielile și analizează unde poți să faci economii. Aplicații de urmărire a cheltuielilor pot să te ajute să-ți monitorizezi cu ușurință bugetul.
                            </li>
                            <li> <b> Economisește! </b> Gândul că nu există o plasă de siguranță în cazul unui eveniment neprevăzut din viața noastră poate fi o (altă) sursă de stres financiar. Așa că, indiferent de nivelul veniturilor tale, este important să începi să economisești cât mai curând posibil.
                            </li>

                        </ol>
                    </div>
                </div>
            )}
            {selectedSection === 'intrebari-frecvente' && (
                <div className='card-container mt-3' >
                    <div className='card-intrebari'>

                        <p className='intrebare'>
                            Ce este educația financiară?
                        </p>
                        <p> Educația financiară este procesul de învățare a abilităților, cunoștințelor și înțelegerii necesare pentru a gestiona cu succes banii și finanțele personale. Aceasta include aspecte precum bugetarea, economisirea, investițiile, gestionarea datoriilor și multe altele.
                        </p>
                    </div>

                    <div className='card-intrebari'>

                        <p className='intrebare' >
                            De ce este importantă educația financiară?
                        </p>

                        <p> Educația financiară este esențială pentru a lua decizii informate și pentru a asigura un viitor financiar mai stabil. Vă ajută să evitați problemele financiare, să economisiți bani și să atingeți obiectivele financiare.
                        </p>

                    </div>
                    <div className='card-intrebari'>
                        <p className='intrebare'>
                            Cine ar trebui să se intereseze de educația financiară?
                        </p>

                        <p>Educația financiară este importantă pentru toată lumea, indiferent de vârstă sau statut financiar. Cu toții gestionăm bani în viața de zi cu zi, așa că toată lumea poate beneficia de înțelegerea mai bună a finanțelor personale.
                        </p>
                    </div>
                    <div className='card-intrebari'>

                        <p className='intrebare'>
                            Cum pot începe să învăț despre educația financiară?
                        </p>

                        <p> Există numeroase resurse disponibile, inclusiv site-uri web, cărți, podcast-uri și seminarii despre educație financiară. Noi oferim o gamă variată de resurse aici, pe [Numele Paginii Tale].
                        </p>

                    </div>
                    <div className='card-intrebari'>
                        <p className='intrebare'>
                            Cum să încep să economisesc bani?
                        </p>

                        <p>Un prim pas important este să creați un buget personal și să identificați domeniile în care puteți economisi. Apoi, alocați o parte din venituri pentru economii și asigurați-vă că respectați această alocație în fiecare lună.
                        </p>
                    </div>
                    <div className='card-intrebari'>

                        <p className='intrebare'>
                            Ce sunt investițiile și cum să încep să investesc?
                        </p>

                        <p>Investițiile implică plasarea banilor în active cu scopul de a obține profit pe termen lung. Este important să învățați despre diferite tipuri de investiții și să consultați un consilier financiar înainte de a investi.
                        </p>
                    </div>
                    <div className='card-intrebari'>
                        <p className='intrebare'>
                            Cum pot să-mi îmbunătățesc scorul de credit?
                        </p>

                        <p> Un scor de credit bun este crucial pentru accesul la credite și împrumuturi avantajoase. Pentru a-l îmbunătăți, plătiți facturile la timp, evitați datoriile excesive și verificați periodic raportul de credit pentru erori.
                        </p>
                    </div>
                </div>
            )}
            {selectedSection === 'challenges' && (
                <div class="challenges-container">
                    <div class="challenge-card" data-image="chal1">
                    <input type="checkbox" id="challenge1" class="challenge-checkbox"/>
                    <label for="challenge1"> Provocare 1</label>
                    <p>Provocare 1</p>
                        <p>încearcă să nu cheltui mai mult de 20 lei azi.</p>
                    </div>

                    <div class="challenge-card" data-image="chal2">
                    <input type="checkbox" id="challenge2" class="challenge-checkbox"/>
                    <label for="challenge2"> Provocare 2</label>
                    <p>Provocare 2</p>
                        <p>Deschide-ți azi un cont de economii.</p>
                    </div>

                    <div class="challenge-card" data-image="chal3">
                    <input type="checkbox" id="challenge3" class="challenge-checkbox"/>
                    <label for="challenge3"> Provocare 3</label>
                    <p>Provocare 3</p>
                        <p>Alege 3 newslettere promoționale și dă unsubscribe la acestea pentru a te feri de tentații.</p>
                    </div>

                    <div class="challenge-card" data-image="chal4">
                    <input type="checkbox" id="challenge4" class="challenge-checkbox"/>
                    <label for="challenge4"> Provocare 4</label>
                    <p>Provocare 4</p>
                        <p>Șterge-ți datele cardului din Google Pay sau de pe site-uri de unde faci shopping regulat pentru a evita cheltuielile impulsive.</p>
                    </div>

                    <div class="challenge-card" data-image="chal5">
                    <input type="checkbox" id="challenge5" class="challenge-checkbox"/>
                    <label for="challenge5"> Provocare 5</label>
                    <p>Provocare 5</p>
                        <p>Stabileste un obiectiv financiar pentru urmatoarea luna.</p>
                    </div>

                    <div class="challenge-card" data-image="chal6">
                    <input type="checkbox" id="challenge6" class="challenge-checkbox"/>
                    <label for="challenge6"> Provocare 6</label>
                    <p>Provocare 6</p>
                        <p>Descarcă o aplicație de administrare a finanțelor personale.</p>
                    </div>

                    <div class="challenge-card" data-image="chal7">
                    <input type="checkbox" id="challenge1" class="challenge-checkbox"/>
                    <label for="challenge7"> Provocare 7</label>
                    <p>Provocare 7</p>
                        <p>În loc să ieși în oraș, organizează o seară de board games la tine acasă. </p>
                    </div>

                    <div class="challenge-card" data-image="chal8">
                    <input type="checkbox" id="challenge8" class="challenge-checkbox"/>
                    <label for="challenge8"> Provocare 8</label>
                    <p>Provocare 8</p>
                        <p>Înainte să mergi azi la cumpărături, fă-ți o listă clară și respect-o.</p>
                    </div>

                    <div class="challenge-card" data-image="chal9">
                    <input type="checkbox" id="challenge9" class="challenge-checkbox"/>
                    <label for="challenge9"> Provocare 9</label>
                    <p>Provocare 9</p>
                        <p>Ascultă un podcast financiar în timp ce faci îți faci treburile casnice de azi.</p>
                    </div>

                    <div class="challenge-card" data-image="chal10">
                    <input type="checkbox" id="challenge10" class="challenge-checkbox"/>
                    <label for="challenge10"> Provocare 10</label>
                    <p>Provocare 10</p>
                        <p>Notează-ți în calendar zilele în care trebuie să faci plăți pentru a nu fi taxat în plus.</p>
                    </div>

                    <div class="challenge-card" data-image="chal11">
                    <input type="checkbox" id="challenge11" class="challenge-checkbox"/>
                    <label for="challenge11"> Provocare 11</label>
                    <p>Provocare 11</p>
                        <p>Cand mergi azi la munca, ia-ti mancarea gatita de tine ieri in loc sa comanzi.</p>
                    </div>

                    <div class="challenge-card" data-image="chal12">
                    <input type="checkbox" id="challenge12" class="challenge-checkbox"/>
                    <label for="challenge12"> Provocare 12</label>
                    <p>Provocare 12</p>
                        <p>Descarcă-ți o aplicație de resell și vinde-ți bluza aia pe care n-ai mai purtat-o de un an.</p>
                    </div>

                    <div class="challenge-card" data-image="chal13">
                    <input type="checkbox" id="challenge13" class="challenge-checkbox"/>
                    <label for="challenge13"> Provocare 13</label>
                    <p>Provocare 13</p>
                        <p>Mergi azi la cumpărături singur pentru a fi mai focusat pe ce ai de luat.</p>
                    </div>

                    <div class="challenge-card" data-image="chal14">
                    <input type="checkbox" id="challenge14" class="challenge-checkbox"/>
                    <label for="challenge14"> Provocare 14</label>
                    <p>Provocare 14</p>
                        <p>Deschide-ți azi un fond de urgență, pune primii 100 de lei în acest fond.</p>
                    </div>

                    <div class="challenge-card" data-image="chal15">
                    <input type="checkbox" id="challenge15" class="challenge-checkbox"/>
                    <label for="challenge15"> Provocare 15</label>
                    <p>Provocare 15</p>
                        <p>Pune deoparte bancnotele de 5 lei pe care le primești rest.</p>
                    </div>

                    <div class="challenge-card" data-image="chal16">
                    <input type="checkbox" id="challenge16" class="challenge-checkbox"/>
                    <label for="challenge16"> Provocare 16</label>
                    <p>Provocare 16</p>
                        <p>Închide apa când te speli pe dinți. Datele arată că vei folosi mai puțin de 2 litri/zi în acest fel.</p>
                    </div>

                    <div class="challenge-card" data-image="chal17">
                    <input type="checkbox" id="challenge17" class="challenge-checkbox"/>
                    <label for="challenge17"> Provocare 17</label>
                    <p>Provocare 17</p>
                        <p>Provocarea no spend day: Incearca sa stai o zi fara sa cheltui nimic.</p>
                    </div>

                    <div class="challenge-card" data-image="chal18">
                    <input type="checkbox" id="challenge18" class="challenge-checkbox"/>
                    <label for="challenge18"> Provocare 18</label>
                    <p>Provocare 18</p>
                        <p>Fă o analiză S.M.A.R.T. a obiectivului tău financiar.</p>
                    </div>

                    <div class="challenge-card" data-image="chal19">
                    <input type="checkbox" id="challenge19" class="challenge-checkbox"/>
                    <label for="challenge19"> Provocare 19</label>
                    <p>Provocare 19</p>
                        <p>Organizează-ți toate hainele astfel încât să le poți vedea pe toate în dulap. Acum nu o să mai ai scuza că ”nu ai cu se să te îmbraci”!</p>
                    </div>

                    <div class="challenge-card" data-image="chal20">
                    <input type="checkbox" id="challenge20" class="challenge-checkbox"/>
                    <label for="challenge20"> Provocare 20</label>
                    <p>Provocare 20</p>
                        <p>Fă-ți un abonament de familie pentru serviciile de streaming și împarte-l cu prietenii.</p>
                    </div>

                    <div class="challenge-card" data-image="chal21">
                    <input type="checkbox" id="challenge21" class="challenge-checkbox"/>
                    <label for="challenge21"> Provocare 21</label>
                    <p>Provocare 21</p>
                        <p>Schimbă-ți azi becul obișnuit cu unul economic.</p>
                    </div>

                    <div class="challenge-card" data-image="chal22">
                    <input type="checkbox" id="challenge22" class="challenge-checkbox"/>
                    <label for="challenge22"> Provocare 22</label>
                    <p>Provocare 22</p>
                        <p>Gătește o masă cu ce ai rămas prin frigider. Nici nu știi cât de creativ poți să devii!</p>
                    </div>

                    <div class="challenge-card" data-image="chal23">
                    <input type="checkbox" id="challenge23" class="challenge-checkbox"/>
                    <label for="challenge23"> Provocare 23</label>
                    <p>Provocare 23</p>
                        <p>Incepe de azi sa pui 10 lei deoparte pentru urgente medicale.</p>
                    </div>

                    <div class="challenge-card" data-image="chal24">
                    <input type="checkbox" id="challenge24" class="challenge-checkbox"/>
                    <label for="challenge24"> Provocare 24</label>
                    <p>Provocare 24</p>
                        <p>Când mergi azi la magazin, ia-ți o pungă cu tine și nu mai cumpăra de acolo.</p>
                    </div>

                    <div class="challenge-card" data-image="chal25">
                    <input type="checkbox" id="challenge25" class="challenge-checkbox"/>
                    <label for="challenge25"> Provocare 25</label>
                    <p>Provocare 25</p>
                        <p>Cumpără un cadou pentru cineva drag de Crăciun și astfel scapi de presiunea achiziționării tuturor cadourilor în luna decembrie.</p>
                    </div>

                    <div class="challenge-card" data-image="chal26">
                    <input type="checkbox" id="challenge26" class="challenge-checkbox"/>
                    <label for="challenge26"> Provocare 26</label>
                    <p>Provocare 26</p>
                        <p>E ziua prietenului tău azi? Fă-i un cadou DIY!</p>
                    </div>

                    <div class="challenge-card" data-image="chal27">
                    <input type="checkbox" id="challenge27" class="challenge-checkbox"/>
                    <label for="challenge27"> Provocare 27</label>
                    <p>Provocare 27</p>
                        <p>Când îți gătești cina în seara asta, folosește capacul pe tigaie sau oală pentru a consuma mai putin gaz sau energie electrică.</p>
                    </div>

                    <div class="challenge-card" data-image="chal28">
                    <input type="checkbox" id="challenge28" class="challenge-checkbox"/>
                    <label for="challenge28"> Provocare 28</label>
                    <p>Provocare 28</p>
                        <p>Vrei să-ți cumperi cartea aia? Vezi mai întâi dacă o găsești la cea mai apropiată bibliotecă.</p>
                    </div>

                    <div class="challenge-card" data-image="chal29">
                    <input type="checkbox" id="challenge29" class="challenge-checkbox"/>
                    <label for="challenge29"> Provocare 29</label>
                    <p>Provocare 29</p>
                        <p>Dacă ți s-a stricat un lucru ușor de reparat, cere ajutorul unui prieten sau încearcă tu, în loc să plătești pe cineva.</p>
                    </div>

                    <div class="challenge-card" data-image="chal30">
                    <input type="checkbox" id="challenge30" class="challenge-checkbox"/>
                    <label for="challenge30"> Provocare 30</label>
                    <p>Provocare 30</p>
                        <p>Daca trebuie sa mergi azi la supermarket, nu te duce cand iti este foame. Vei fi tentat sa cumperi mai mult.</p>
                    </div>


                    <div class="challenge-card" data-image="chal31">
                    <input type="checkbox" id="challenge31" class="challenge-checkbox"/>
                    <label for="challenge31"> Provocare 31</label>
                    <p>Provocare 31</p>
                        <p>Împărtășește-ți cunoștințele cu ceilalți și încurajează-i să își dezvolte și ei inteligența financiară. Pune azi pe social media un sfat practic despre cum să ai grijă de bani.</p>
                    </div>

                </div>
            )}
        </div>

    );
};

export default EducatieFinanciara;
