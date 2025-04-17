// import React from "react";
import Link from "next/link";

export default async function Facts({ params }) {
  // alert("hello");
  const { slug } = await params;
  let data = [];

  try {
    const res = await fetch("http://localhost:3000/all.json", {
      // cache: "no-store",
    });
    if (res.ok) {
      data = await res.json();
    }
  } catch (e) {
    console.error(e);
  }

  const hierarchy = {};
  data.forEach((country) => {
    if (!country?.subregion) {
      country.subregion = "—";
    }

    if (!(country.region in hierarchy)) {
      hierarchy[country.region] = {};
    }

    if (!(country.subregion in hierarchy[country.region])) {
      hierarchy[country.region][country.subregion] = {};
    }

    hierarchy[country.region][country.subregion][country.name.common] = country;
  });

  let region, subregion, country;

  if (slug?.length > 0) {
    region = decodeURI(slug[0]);

    if (slug?.length > 1) {
      subregion = decodeURI(slug[1]);

      if (slug?.length > 2) {
        country = decodeURI(slug[2]);
      }
    }
  }

  console.log(region, subregion, country);

  let regions, subregions, countries, facts;
  regions = Object.keys(hierarchy).sort();

  if (region) {
    subregions = Object.keys(hierarchy[region]).sort();
  }

  if (subregion) {
    countries = Object.keys(hierarchy[region][subregion]).sort();
  }

  if (country) {
    facts = hierarchy[region][subregion][country];
  }

  return (
    <>
      <header>
        <nav className="flex flex-wrap gap-2">
          {regions &&
            regions.map((r) => (
              <Link key={r} className="text-2xl" href={`/${encodeURI(r)}`}>
                {r}
              </Link>
            ))}
        </nav>
        <nav className="mt-2 flex flex-wrap gap-2">
          {subregions &&
            subregions.map((s) => (
              <Link
                key={s}
                className="text-lg"
                href={`/${encodeURI(region)}/${encodeURI(s)}`}
              >
                {s}
              </Link>
            ))}
        </nav>
        <nav className="mt-2 flex flex-wrap gap-2">
          {countries &&
            countries.map((c) => (
              <Link
                key={c}
                className=""
                href={`/${encodeURI(region)}/${encodeURI(
                  subregion
                )}/${encodeURI(c)}`}
              >
                {c}
              </Link>
            ))}
        </nav>
      </header>
      <main className="mt-2">
        {facts && (
          <table>
            <tbody>
              <tr>
                <td>Name</td>
                <td>{facts.name.common}</td>
              </tr>
            </tbody>
          </table>
        )}
      </main>
    </>
  );
}

// export async function generateStaticParams() {
//   // const posts = await fetch("https://.../posts").then((res) => res.json());

//   // return posts.map((post) => ({
//   //   slug: post.slug,
//   // }));
//   return [
//     { slug: [] },
//     { slug: ["Africa"] },
//     { slug: ["Africa", "Eastern Africa"] },
//   ];
// }
