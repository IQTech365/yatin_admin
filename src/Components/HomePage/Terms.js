import React from "react";
import { Button } from "react-bootstrap";
import "./styles.css";
import history from "../../Utils/History";

export const Terms = () => {
  return (
    <div style={{ fontSize: 14, padding: 10, background: "antiquewhite" }}>
      <div style={{ textAlign: "center" }}>
        {" "}
        <Button
          variant="primary"
          style={{ borderRadius: 20, marginBottom: 20 }}
          onClick={() => {
            history.push("/");
          }}
        >
          Back to Home
        </Button>
      </div>

      <h1 style={{ textAlign: "center" }}>Terms of Use</h1>
      <br />
      <p>
        These terms of use (“Terms of Use”) govern your use of our website
        “Mobilly Invite” located at www.mobillyinvite.com . Please read these
        Terms of Use carefully before you use our services. If you do not agree
        to these Terms of Use, you may not access and use our website. By
        accessing and using our website you signify your acceptance to this
        Terms of Use posted on our website and amended from time to time, and
        this would create a legally binding agreement to abide by the same.
      </p>
      <br />
      <p>
        ‘Mobilly Invite’ is owned and operated by CY Ecommerce LLP established
        under Indian Laws, and having its registered office at 13A Janyug
        Apartment Sector 14 Extension, Rohini, Delhi. For the purpose of these
        Terms of Use, wherever the context so requires, “you” or “user” shall
        mean any natural or legal person who shall transact on our website. The
        terms “we”, “us”, or “our” shall mean CY Ecommerce LLP.
      </p>
      <br />
      <p>
        You agree, undertake and confirm that your use of our website shall be
        strictly governed by the following binding principles: You shall not
        host, display, upload, download, modify, publish, transmit, update or
        share any information which
      </p>

      <ol type="1">
        <li className="list-height">
          belongs to another person and which you do not have any right to;
        </li>
        <li className="list-height">
          is grossly harmful, harassing, blasphemous, defamatory, obscene,
          pornographic, paedophilic, libellous, slanderous, criminally inciting
          or invasive of another's privacy, hateful, or racially, ethnically
          objectionable, disparaging, relating or encouraging money laundering
          or gambling, or otherwise unlawful in any manner whatsoever;
        </li>
        <li className="list-height">harm minors in any way</li>
        <li>
          infringes any patent, trademark, copyright or other intellectual
          property rights;
        </li>
        <li className="list-height">
          violates any law for the time being in force;
        </li>
        <li className="list-height">
          deceives or misleads the addressee/users about the origin of such
          messages or communicates any information which is grossly offensive or
          menacing in nature
        </li>
        <li className="list-height">impersonate another person</li>
        <li className="list-height">
          contains software viruses or any other computer code, files or
          programs designed to interrupt, destroy or limit the functionality of
          any computer resource
        </li>
        <li className="list-height">
          i) threatens the unity, integrity, defence, security or sovereignty of
          India, friendly relations with foreign states, or public order or
          causes incitement to the commission of any criminal offence or
          prevents investigation of any offence or is insulting any other nation
        </li>
        <li className="list-height">
          is misleading or misrepresentative in any way
        </li>
        <li className="list-height">
          is patently offensive to the online community, such as sexually
          explicit content, or content that promotes obscenity, paedophilia,
          racism, bigotry, hatred or physical harm of any kind against any group
          or individual
        </li>
        <li className="list-height">
          promotes illegal activities or conduct that is abusive, threatening,
          obscene, defamatory or libellous
        </li>
        <li className="list-height">
          provides material that exploits people in a sexual, violent or
          otherwise inappropriate manner or solicits personal information from
          anyone
        </li>
        <li className="list-height">
          contains video, photographs, or images of another person (with a minor
          or an adult)
        </li>
        <li className="list-height">
          interferes with another user's use and enjoyment of our website or any
          third party's user and enjoyment of similar services
        </li>
        <li className="list-height">
          contains any trojan horses, worms, time bombs, cancelbots, easter eggs
          or other computer programming routines that may damage, detrimentally
          interfere with, diminish value of, surreptitiously intercept or
          expropriate any system, data or personal information
        </li>
        <li className="list-height">
          directly or indirectly, offers, attempts to offer, trades or attempts
          to trade in any item, the dealing of which is prohibited or restricted
          in any manner under the provisions of any applicable law, rule,
          regulation or guideline for the time being in force
        </li>
        <li className="list-height">
          contains software virus or any other computer code, file or program
          designed to interrupt, destroy or limit the functionality of any
          computer resource
        </li>
        <li className="list-height">
          is patently false and untrue, and is written or published in any form,
          with the intent to mislead or harass a person, entity or agency for
          financial gain or to cause any injury to any person
        </li>
      </ol>
      <br />
      <p>
        We reserve the right, but has no obligation, to monitor the materials
        posted on our website. We shall have the right to remove or edit any
        content that in our sole discretion violates, or is alleged to violate,
        any applicable law or these Terms of Use. Notwithstanding this right,
        YOU SHALL REMAIN SOLELY RESPONSIBLE FOR WHATEVER CONTENT OR MATERIAL YOU
        POST ON OUR WEBSITE.
        <br />
        <br />
        Please be advised that such Content posted does not necessarily reflect
        our views. In no event shall we assume or have any responsibility or
        liability for any content posted or for any claims, damages or losses
        resulting from use of content and/or appearance of content on our
        website. You hereby represent and warrant that you have all necessary
        rights in and to all content which you provide and all information it
        contains and that such content shall not infringe any proprietary or
        other rights of third parties or contain any libellous, tortious, or
        otherwise unlawful information.
      </p>

      <p>
        Please be advised that in case of you do not comply with these Terms of
        Use, or if you are found indulging in any unlawful activity while
        accessing and using our website, we have absolute right to immediately
        terminate your access and usage rights of our website.
      </p>
      <h3>DISCLAIMER</h3>
      <br />
      <p>
        OUR WEBSITE MAY BE UNDER CONSTANT UPGRADES, AND SOME FUNCTIONS AND
        FEATURES MAY NOT BE FULLY OPERATIONAL. DUE TO THE VAGARIES THAT CAN
        OCCUR IN THE ELECTRONIC DISTRIBUTION OF INFORMATION AND DUE TO THE
        LIMITATIONS INHERENT IN PROVIDING INFORMATION OBTAINED FROM MULTIPLE
        SOURCES, THERE MAY BE DELAYS, OMISSIONS, OR INACCURACIES IN THE CONTENT
        PROVIDED ON OUR WEBSITE. AS A RESULT, WE DO NOT REPRESENT THAT THE
        INFORMATION POSTED IS CORRECT IN EVERY CASE. WE SHALL NOT BE LIABLE TO
        YOU OR ANYONE ELSE FOR ANY LOSSES OR INJURY ARISING OUT OF OR RELATING
        TO THE INFORMATION PROVIDED ON THE PLATFORM. IN NO EVENT WILL WE OR OUR
        EMPLOYEES, AFFILIATES, AUTHORS OR AGENTS BE LIABLE TO YOU OR ANY THIRD
        PARTY FOR ANY DECISION MADE OR ACTION TAKEN BY YOUR RELIANCE ON THE
        CONTENT CONTAINED HEREIN.
      </p>
    </div>
  );
};

export default Terms;
