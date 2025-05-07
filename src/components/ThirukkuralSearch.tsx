import React, { useState } from 'react';
import MenuBookIcon from '@mui/icons-material/MenuBook';

interface ThirukkuralSearchProps {
  language: 'ta' | 'en' | 'hi';
}

const APP_ID = 'YOUR_APPID_HERE'; // <-- Replace with your real API key!

const langLabels = {
  ta: {
    placeholder: '1 முதல் 1330 குறள்களைத் தேட எந்த எண்ணையும் உள்ளிடவும்',
    button: 'தேடு',
    alertEmpty: 'எண்ணை உள்ளிடவும். காலியாக இருக்க முடியாது..!',
    alertRange: 'திருக்குறளில் 1330 குறள்கள் மட்டுமே இருப்பதால், 1 முதல் 1330 வரையிலான மதிப்புகளை உள்ளிடவும்.',
    about: `<p>- திருக்குறள் <mark>திருவள்ளுவரால்</mark> எழுதப்பட்டது.<br>
- திருக்குறள் முதன் முதலில் 1812 ஆம் ஆண்டு அச்சிடப்பட்டு வெளியிடப்பட்டது.<br>
- திருக்குறளின் முந்தைய பெயர் <mark>"முப்பால்"</mark>.<br>
- திருக்குறள் 133 அத்தியாயங்களைக் கொண்டது.<br>
- ஒவ்வொரு அத்தியாயத்திலும் 10 குறள்கள் இருப்பதால் மொத்தம் 1330 குறள்கள் உள்ளன.<br>
<b>திருக்குறளில் மூன்று முக்கிய பிரிவுகள் உள்ளன அவை :</b><br>
1.அறத்துப்பால் - 380 குறள்கள்(1-380)<br>
2.பொருட்பால் - 700 குறள்கள்(381-1080)<br>
3.காமத்துப்பால் - 250 குறள்கள்(1081-1330)</p>`
  },
  en: {
    placeholder: 'Enter any number from 1 to 1330 to search for a Kural',
    button: 'Search',
    alertEmpty: 'Please enter a number. It cannot be empty!',
    alertRange: 'There are only 1330 Kurals. Please enter a value between 1 and 1330.',
    about: `<p>- Thirukkural was written by <mark>Thiruvalluvar</mark>.<br>
- First published in 1812.<br>
- Earlier name: <mark>"Muppaal"</mark>.<br>
- 133 chapters, 10 Kurals each, total 1330 Kurals.<br>
<b>Three main sections:</b><br>
1. Arathuppaal - 380 Kurals (1-380)<br>
2. Porutpaal - 700 Kurals (381-1080)<br>
3. Kamathuppaal - 250 Kurals (1081-1330)</p>`
  },
  hi: {
    placeholder: '1 से 1330 तक कोई भी संख्या दर्ज करें',
    button: 'खोजें',
    alertEmpty: 'कृपया एक संख्या दर्ज करें। यह खाली नहीं हो सकता!',
    alertRange: 'केवल 1330 कुरल हैं। कृपया 1 से 1330 के बीच मान दर्ज करें।',
    about: `<p>- तिरुक्कुरल <mark>तिरुवल्लुवर</mark> द्वारा लिखा गया।<br>
- पहली बार 1812 में प्रकाशित।<br>
- पहले का नाम: <mark>"मुप्पाल"</mark>.<br>
- 133 अध्याय, प्रत्येक में 10 कुरल, कुल 1330 कुरल।<br>
<b>तीन मुख्य भाग:</b><br>
1. अरत्तुप्पाल - 380 कुरल (1-380)<br>
2. पोरुट्प्पाल - 700 कुरल (381-1080)<br>
3. कामत्तुप्पाल - 250 कुरल (1081-1330)</p>`
  }
};

const ThirukkuralSearch: React.FC<ThirukkuralSearchProps> = ({ language }) => {
  const [number, setNumber] = useState('');
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');

  const labels = langLabels[language];

  const handleSearch = async () => {
    setError('');
    setResult(null);
    if (!number) {
      alert(labels.alertEmpty);
      return;
    }
    const num = parseInt(number, 10);
    if (isNaN(num) || num < 1 || num > 1330) {
      alert(labels.alertRange);
      return;
    }
    try {
      const res = await fetch(`https://getthirukkural.appspot.com/api/3.0/kural/${num}?appid=${APP_ID}&format=json`);
      const data = await res.json();
      setResult(data);
    } catch (e) {
      setError('Error fetching Kural.');
    }
    setNumber('');
  };

  return (
    <div className="thirukkural-container" style={{ maxWidth: 540, margin: '0 auto', background: 'linear-gradient(135deg, #f8ffae 0%, #fbc2eb 100%)', borderRadius: 24, padding: 32, boxShadow: '0 8px 32px #ffd54f55', marginTop: 32, border: '4px solid #ffd54f', position: 'relative' }}>
      <div style={{ position: 'absolute', top: 16, right: 24, fontSize: 36, color: '#f7971e', opacity: 0.7 }}>
        <MenuBookIcon fontSize="inherit" />
      </div>
      <div dangerouslySetInnerHTML={{ __html: labels.about }} style={{ marginBottom: 18, fontSize: '1.1rem', color: '#333', fontFamily: 'Quicksand, Comic Sans MS, cursive' }} />
      <div style={{ display: 'flex', gap: 10, marginBottom: 18 }}>
        <input
          type="text"
          className="form-control"
          value={number}
          onChange={e => setNumber(e.target.value)}
          placeholder={labels.placeholder}
          style={{ flex: 1, borderRadius: 12, border: '2px solid #ffd54f', padding: 10, fontSize: '1.1rem', background: '#fff', fontFamily: 'Quicksand, Comic Sans MS, cursive' }}
        />
        <button
          className="btn"
          style={{ background: 'linear-gradient(90deg, #f7971e 0%, #ffd200 100%)', color: '#222', border: 'none', borderRadius: 12, fontWeight: 700, fontSize: '1.1rem', padding: '10px 28px', cursor: 'pointer', boxShadow: '0 2px 8px #ffd54f55' }}
          onClick={handleSearch}
        >
          {labels.button}
        </button>
      </div>
      {result && (
        <div className="card text-center" style={{ background: '#fff', borderRadius: 20, boxShadow: '0 4px 16px #ffd54f55', padding: 24, marginTop: 18, display: 'flex', flexDirection: 'column', alignItems: 'center', border: '2px solid #ffd54f', minHeight: 220 }}>
          {/* Kural Number Badge */}
          <div style={{ background: '#ffd200', color: '#fff', fontWeight: 900, borderRadius: 20, padding: '4px 18px', fontSize: '1.1rem', marginBottom: 10, boxShadow: '0 2px 8px #ffd54f55', letterSpacing: 1 }}>
            {language === 'ta' ? 'குறள் எண்' : language === 'hi' ? 'कुरल संख्या' : 'Kural No'}: {result.number}
          </div>
          {/* Section & Chapter */}
          <div style={{ display: 'flex', gap: 16, marginBottom: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
            <span style={{ color: '#43c6ac', fontWeight: 700, fontSize: '1.1rem' }}>
              <span role="img" aria-label="section">📚</span> {language === 'ta' ? result.paal : result.paal}
            </span>
            <span style={{ color: '#ff9800', fontWeight: 700, fontSize: '1.1rem' }}>
              <span role="img" aria-label="chapter">📖</span> {language === 'ta' ? result.athigaram : result.athigaram}
            </span>
          </div>
          {/* Kural Lines */}
          <div style={{ fontSize: '1.3rem', color: '#222', margin: '8px 0', fontFamily: 'Quicksand, Comic Sans MS, cursive', fontWeight: 700, textAlign: 'center' }}>
            {language === 'ta' ? (
              <>
                <div>{result.line1}</div>
                <div>{result.line2}</div>
              </>
            ) : (
              <div>{result.translation}</div>
            )}
          </div>
          {/* Explanation */}
          <div style={{ marginTop: 10, background: '#f8ffae', borderRadius: 12, padding: 14, color: '#43c6ac', fontWeight: 600, fontSize: '1.08rem', boxShadow: '0 2px 8px #ffd54f22', width: '100%', maxWidth: 420, textAlign: 'left' }}>
            <span style={{ fontWeight: 900, color: '#f7971e' }}>
              {language === 'ta' ? 'விளக்கம்' : language === 'hi' ? 'व्याख्या' : 'Explanation'}:
            </span>
            <br />
            {language === 'ta' ? result.urai1 : result.translation}
          </div>
        </div>
      )}
      {error && <div style={{ color: 'red', marginTop: 8 }}>{error}</div>}
    </div>
  );
};

export default ThirukkuralSearch; 