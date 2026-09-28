import {
  SectionHeader,
  Tag,
  WhyThisCard
} from '../components/cards.js';


export function renderSettings() {

  return `

    ${SectionHeader({
      eyebrow: 'SignalDNA workspace',
      title: 'Settings',
      description:
        'Manage your creator context and workspace preferences.'
    })}


    <section class="settings-grid">


      <!-- CREATOR PROFILE -->

      <div class="panel settings-main">

        ${SectionHeader({
          eyebrow: 'Creator profile',
          title: 'Your creator context',
          description:
            'This context helps SignalDNA understand your content and audience.'
        })}


        <div class="settings-form">


          <div class="form-group">

            <label for="creator-name">
              Creator name
            </label>

            <input
              id="creator-name"
              type="text"
              value="Aarav Kapoor"
              placeholder="Enter creator name"
            />

          </div>


          <div class="form-group">

            <label for="creator-niche">
              Primary niche
            </label>

            <input
              id="creator-niche"
              type="text"
              value="Tech education"
              placeholder="Enter your primary niche"
            />

          </div>


          <div class="form-group">

            <label for="publishing-rhythm">
              Publishing rhythm
            </label>

            <select id="publishing-rhythm">

              <option>
                1 post / week
              </option>

              <option>
                2 posts / week
              </option>

              <option selected>
                3 posts / week
              </option>

              <option>
                4+ posts / week
              </option>

            </select>

          </div>


          <div class="form-group">

            <label>
              Content strengths
            </label>

            <div class="tag-cloud">

              ${Tag({
                children: 'Practical teaching',
                tone: 'primary'
              })}

              ${Tag({
                children: 'Step-by-step',
                tone: 'primary'
              })}

              ${Tag({
                children: 'Strong hooks',
                tone: 'secondary'
              })}

              ${Tag({
                children: 'Proof-led',
                tone: 'neutral'
              })}

            </div>

          </div>


          <div class="settings-actions">

            <button
              class="primary-button"
              data-action="save-settings"
            >
              Save changes
            </button>

          </div>


        </div>

      </div>



      <!-- WORKSPACE PREFERENCES -->

      <div class="panel">

        ${SectionHeader({
          eyebrow: 'Workspace',
          title: 'SignalDNA preferences',
          description:
            'Preferences for how the workspace presents creator intelligence.'
        })}


        <div class="settings-option">

          <div>

            <strong>
              Content intelligence
            </strong>

            <p>
              Use creator context when interpreting audience and trend signals.
            </p>

          </div>

          <label class="toggle">

            <input
              type="checkbox"
              checked
            />

            <span></span>

          </label>

        </div>


        <div class="settings-option">

          <div>

            <strong>
              Evidence-first insights
            </strong>

            <p>
              Show supporting evidence alongside important insights.
            </p>

          </div>

          <label class="toggle">

            <input
              type="checkbox"
              checked
            />

            <span></span>

          </label>

        </div>


        <div class="settings-option">

          <div>

            <strong>
              Memory learning
            </strong>

            <p>
              Allow useful experiment results to become future creator context.
            </p>

          </div>

          <label class="toggle">

            <input
              type="checkbox"
              checked
            />

            <span></span>

          </label>

        </div>

      </div>

    </section>



    <!-- CREATOR CONTEXT SUMMARY -->

    <section class="panel">

      ${SectionHeader({
        eyebrow: 'Creator context',
        title: 'What SignalDNA currently knows',
        description:
          'A quick summary of the creator context used across the workspace.'
      })}


      <div class="settings-summary">


        <div class="summary-item">

          <span>
            Creator
          </span>

          <strong>
            Aarav Kapoor
          </strong>

        </div>


        <div class="summary-item">

          <span>
            Niche
          </span>

          <strong>
            Tech education
          </strong>

        </div>


        <div class="summary-item">

          <span>
            Publishing rhythm
          </span>

          <strong>
            3 posts / week
          </strong>

        </div>


        <div class="summary-item">

          <span>
            Memory observations
          </span>

          <strong>
            28
          </strong>

        </div>


      </div>


      ${WhyThisCard({
        title: 'Why creator context matters',
        children:
          'SignalDNA uses creator context to connect audience demand, Content DNA, trends, opportunities, and experiments instead of treating every creator the same.'
      })}

    </section>



    <!-- FRONTEND STATUS -->

    <section class="panel settings-status">

      <div>

        <div class="card-kicker">
          Frontend foundation
        </div>

        <h3>
          Backend connection is not active yet
        </h3>

        <p>
          These settings currently work as frontend controls.
          They can later be connected to the backend API without changing
          the page structure.
        </p>

      </div>


      <span class="tag tag-neutral">
        Frontend only
      </span>

    </section>

  `;
}