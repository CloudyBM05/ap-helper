import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// APGovCases.tsx now contains the notes for the "All Required Cases" AP Gov box
// Make sure to update your routing to use this file for the 'all-cases' route:
// Example (in your router):
// <Route path="/ap-gov-unit/all-cases" element={<APGovCases />} />

// AllRequiredCasesNotes.tsx
// Notes for the "All Required Cases" AP Gov box

export const allRequiredCasesNotes = [
  {
    section: '🇺🇸 Foundational Constitutional Principles',
    cases: [
      {
        name: 'Marbury v. Madison (1803)',
        principle: 'Judicial Review',
        summary: 'Established the Court’s power to declare laws unconstitutional, giving rise to judicial review.'
      },
      {
        name: 'McCulloch v. Maryland (1819)',
        principle: 'Federalism / Necessary & Proper Clause',
        summary: 'Confirmed the supremacy of national over state governments and upheld the implied powers doctrine (Congress can create a national bank).'
      },
      {
        name: 'United States v. Lopez (1995)',
        principle: 'Limits of the Commerce Clause',
        summary: 'Ruled Congress exceeded its power under the Commerce Clause when it tried to ban guns in school zones. Limited federal power.'
      }
    ]
  },
  {
    section: '🗣️ Civil Liberties & Civil Rights',
    cases: [
      {
        name: 'Engel v. Vitale (1962)',
        principle: 'Establishment Clause',
        summary: 'Banned school-sponsored prayer in public schools. Government can\'t promote religion.'
      },
      {
        name: 'Wisconsin v. Yoder (1972)',
        principle: 'Free Exercise Clause',
        summary: 'Ruled Amish children could not be forced to attend school past 8th grade due to religious beliefs.'
      },
      {
        name: 'Tinker v. Des Moines (1969)',
        principle: 'Free Speech in Schools',
        summary: 'Students have the right to symbolic speech (armbands) at school as long as it doesn\'t disrupt learning.'
      },
      {
        name: 'New York Times Co. v. United States (1971)',
        principle: 'Freedom of the Press / Prior Restraint',
        summary: 'Government can\'t prevent publication of the Pentagon Papers unless it causes a direct threat to national security.'
      },
      {
        name: 'Schenck v. United States (1919)',
        principle: 'Free Speech Limits',
        summary: 'Speech creating a "clear and present danger" (like urging people to avoid the draft during wartime) is not protected.'
      }
    ]
  },
  {
    section: '🗳️ Selective Incorporation & Due Process',
    cases: [
      {
        name: 'Gideon v. Wainwright (1963)',
        principle: 'Right to Counsel (6th Amendment)',
        summary: 'States must provide lawyers to defendants who can’t afford one in criminal cases (selective incorporation).'
      },
      {
        name: 'Roe v. Wade (1973)',
        principle: 'Right to Privacy / Due Process',
        summary: 'Legalized abortion by recognizing a woman’s right to privacy under the 14th Amendment.'
      },
      {
        name: 'McDonald v. Chicago (2010)',
        principle: '2nd Amendment / Selective Incorporation',
        summary: 'Incorporated the right to bear arms to the states; states can’t ban handgun ownership.'
      }
    ]
  },
  {
    section: '🧑🏽‍🤝‍🧑🏿 Equal Protection & Civil Rights',
    cases: [
      {
        name: 'Brown v. Board of Education (1954)',
        principle: 'Equal Protection Clause',
        summary: 'Racial segregation in public schools is unconstitutional. "Separate but equal" is inherently unequal.'
      }
    ]
  },
  {
    section: '🗳️ Campaign Finance, Voting, and Representation',
    cases: [
      {
        name: 'Citizens United v. FEC (2010)',
        principle: 'Free Speech & Campaign Finance',
        summary: 'Political spending by corporations and unions is protected free speech. Led to rise of Super PACs.'
      },
      {
        name: 'Baker v. Carr (1962)',
        principle: 'Equal Representation / "One person, one vote"',
        summary: 'Allowed federal courts to intervene in redistricting. Legislative districts must have roughly equal populations.'
      },
      {
        name: 'Shaw v. Reno (1993)',
        principle: 'Equal Protection Clause / Gerrymandering',
        summary: 'Racial gerrymandering is unconstitutional. Districts drawn based on race must meet strict scrutiny.'
      }
    ]
  }
];

const APGovCases: React.FC = () => {
  const navigate = useNavigate();
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({});

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <div className="py-12 min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-3xl mx-auto px-4">
        <button
          onClick={() => navigate('/ap-gov-study-guide')}
          className="mb-8 px-4 py-2 rounded bg-red-100 text-red-700 font-semibold hover:bg-red-200 transition shadow"
        >
          &larr; Back to AP Gov Study Guide
        </button>
        <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">All Required Supreme Court Cases</h2>
        {allRequiredCasesNotes.map((section) => (
          <div key={section.section} className="mb-4">
            <button
              onClick={() => toggleSection(section.section)}
              className="w-full flex items-center justify-between px-4 py-3 bg-blue-100 hover:bg-blue-200 rounded-lg shadow font-semibold text-lg text-blue-900 transition mb-2"
              aria-expanded={!!openSections[section.section]}
            >
              <span>{section.section}</span>
              <span className="ml-2">{openSections[section.section] ? '▲' : '▼'}</span>
            </button>
            {openSections[section.section] && (
              <ul className="space-y-4 mt-2">
                {section.cases.map((c) => (
                  <li key={c.name} className="bg-white rounded-xl shadow p-4 border-l-4 border-blue-300 hover:shadow-lg transition">
                    <div className="font-bold text-lg text-blue-900 mb-1">{c.name}</div>
                    <div className="text-red-700 font-semibold mb-1">Principle: {c.principle}</div>
                    <div className="text-slate-700">{c.summary}</div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default APGovCases;
