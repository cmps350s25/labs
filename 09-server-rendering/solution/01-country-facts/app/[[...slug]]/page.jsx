// "use client";

import Link from "next/link";

export default async function Facts({ params }) {
  const { slug } = params;
  let region, subregion, code, facts, flag, error;

  if (slug?.length > 0) {
    region = decodeURI(slug[0]);
  }
  if (slug?.length > 1) {
    subregion = decodeURI(slug[1]);
  }
  if (slug?.length > 2) {
    code = decodeURI(slug[2]);
  }

  const countries = await fetch(
    "https://restcountries.com/v3.1/all?fields=region,subregion,name,cca3"
  ).then((res) => res.json());

  const tree = {};
  countries.forEach((country) => {
    if (!country?.region) {
      country.region = "…";
    }
    if (!country?.subregion) {
      country.subregion = "…";
    }

    if (!(country.region in tree)) {
      tree[country.region] = {};
    }
    if (!(country.subregion in tree[country.region])) {
      tree[country.region][country.subregion] = {};
    }
    tree[country.region][country.subregion][country.cca3] = country.name.common;
  });

  if (code) {
    let res = await fetch(`https://restcountries.com/v3.1/alpha/${code}`, {
      // cache: "no-store",
    });
    if (!res.ok) {
      error = await res.text();
    } else {
      facts = await res.json();
      facts = facts[0];

      // flag = await fetch(facts.flags.svg).then((res) => res.text());
      // const blob = new Blob([data], {
      //   type: "text/plain;charset=utf-8",
      // });
      // flag = URL.createObjectURL(blob);
    }
  }

  return (
    <>
      <header className="mt-5 mb-3">
        <nav>
          <ol className="flex flex-wrap gap-x-2 text-neutral-600 dark:text-neutral-300 text-xl mb-1">
            {Object.keys(tree)
              .sort()
              .map((key) => (
                <Link
                  className={`underline-offset-4 ${
                    region === key ? "underline" : "hover:underline"
                  }`}
                  key={key}
                  href={`/${encodeURI(key)}`}
                >
                  {key}
                </Link>
              ))}
          </ol>
          {region && (
            <ol className="flex flex-wrap gap-x-2 text-neutral-600 dark:text-neutral-300 text-lg mb-1">
              {Object.keys(tree[region])
                .sort()
                .map((key) => (
                  <Link
                    className={`underline-offset-4 ${
                      subregion === key ? "underline" : "hover:underline"
                    }`}
                    key={key}
                    href={`/${encodeURI(region)}/${encodeURI(key)}`}
                  >
                    {key}
                  </Link>
                ))}
            </ol>
          )}
          {subregion && (
            <ol className="flex flex-wrap gap-x-2 text-neutral-600 dark:text-neutral-300 mb-1">
              {Object.keys(tree[region][subregion])
                .sort((a, b) =>
                  tree[region][subregion][a] < tree[region][subregion][b]
                    ? -1
                    : tree[region][subregion][a] > tree[region][subregion][b]
                    ? 1
                    : 0
                )
                .map((key) => (
                  <Link
                    className={`underline-offset-4 ${
                      code === key ? "underline" : "hover:underline"
                    }`}
                    key={key}
                    href={`/${encodeURI(region)}/${encodeURI(
                      subregion
                    )}/${encodeURI(key)}`}
                  >
                    {tree[region][subregion][key]}
                  </Link>
                ))}
            </ol>
          )}
        </nav>
      </header>
      <main>
        {code && (
          <h2 className="mt-6 mb-4 text-3xl">
            Facts about {tree[region][subregion][code]}
          </h2>
        )}

        {error && <p className="text-red-500">Failed to fetch facts.</p>}
        {facts && (
          <>
            <div id="country-flag" className="mb-4 max-w-md">
              <img src={facts.flags.svg} alt={`Flag of ${facts.name.common}`} />
            </div>
            {/* {flag && embedHTML(flag)} */}
            <table className="table-auto [&_th]:font-medium [&_th]:text-left [&_td]:pl-2">
              <tbody>
                <tr>
                  <th scope="row">Official Name</th>
                  <td className="pl-2">
                    {facts.name.official} ({facts.translations.ara.official})
                  </td>
                </tr>
                <tr>
                  <th scope="row">Capital City</th>
                  <td>
                    {facts?.capital
                      ? facts.capital?.length
                        ? facts.capital.join(", ")
                        : facts.capital
                      : "—"}
                  </td>
                </tr>
                <tr>
                  <th scope="row">Population</th>
                  <td>
                    {facts?.population
                      ? Number(facts.population).toLocaleString()
                      : "—"}
                  </td>
                </tr>
                <tr>
                  <th scope="row">Area</th>
                  <td>
                    {facts?.area
                      ? Number(facts.area).toLocaleString() + "km²"
                      : "—"}
                  </td>
                </tr>
                <tr>
                  <th scope="row">Languages</th>
                  <td>
                    {facts?.languages
                      ? Object.values(facts.languages).join(", ")
                      : "—"}
                  </td>
                </tr>
                <tr>
                  <th className="text-left" scope="row">
                    Currencies
                  </th>
                  <td>
                    {facts?.currencies
                      ? Object.keys(facts.currencies).join(", ")
                      : "—"}
                  </td>
                </tr>
                <tr>
                  <th scope="row">TLD</th>
                  <td className="font-mono">
                    {facts?.tld ? facts.tld.join(", ") : "—"}
                  </td>
                </tr>
              </tbody>
            </table>
          </>
        )}
        {/* {country && !facts && <p>Loading...</p>} */}
      </main>
      <footer></footer>
    </>
  );
}

// export function embedHTML(data) {
//   return (
//     <div
//       id="flag-container"
//       className="mb-2 max-w-md relative"
//       dangerouslySetInnerHTML={{ __html: data }}
//     />
//   );
// }

export async function generateStaticParams() {
  const countries = await fetch(
    "https://restcountries.com/v3.1/all?fields=region,subregion,name,cca3"
  ).then((res) => res.json());

  const tree = {};
  const slugs = [{ slug: [] }];
  countries.forEach((country) => {
    if (!country?.region) {
      country.region = "…";
    }
    if (!country?.subregion) {
      country.subregion = "…";
    }

    if (!(country.region in tree)) {
      tree[country.region] = {};
      slugs.push({ slug: [country.region] });
    }
    if (!(country.subregion in tree[country.region])) {
      tree[country.region][country.subregion] = {};
      slugs.push({
        slug: [country.region, country.subregion],
      });
    }
    tree[country.region][country.subregion][country.cca3] = country.name.common;
    slugs.push({
      slug: [country.region, country.subregion, country.cca3],
    });
  });

  return slugs;
  // return countries.map((country) => ({
  //   slug: [
  //     country?.region ? country.region : "…",
  //     country?.subregion ? country.subregion : "…",
  //     country.cca3,
  //   ],
  // }));
}
