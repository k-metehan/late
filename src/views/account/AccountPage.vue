<!--Account Setup: Main Account setup container-->

<template>
  <div id="account">
    <section class="section">
      <h1 class="title">
        Your Account
      </h1>

      <div class="steps">
        <router-link
          v-for="s in setups"
          :key="s.component"
          :to="{path: s.link}"
          tag="div"
          class="step-item"
          :class="{'is-completed': userSetup[s.setup_check]}"
        >
          <div class="step-marker">
            <span class="icon">
              <i
                v-if="userSetup[s.setup_check]"
                class="fas fa-check"
              />
              <i
                v-else
                class="fas fa-times"
              />
            </span>
          </div>

          <div class="step-details">
            <p class="step-title">
              {{ s.label }}
            </p>
          </div>
        </router-link>
      </div>
      <keep-alive>
        <transition
          name="slide-left"
          mode="out-in"
        >
          <router-view
            class="child-view"
          />
        </transition>
      </keep-alive>
    </section>
  </div>
</template>

<script>
import 'bulma-steps'

export default {
  name: 'AccountPage',
  data () {
    return {
      setups: [
        {
          label: 'Profile',
          link: '/account/profile',
          setup_check: 'profile'
        },
        {
          label: 'School Terms',
          link: '/account/terms',
          setup_check: 'terms'
        },
        {
          label: 'Course Schedule',
          link: '/account/courseschedule',
          setup_check: 'course_schedule'
        },
        {
          label: 'Unavailability',
          link: '/account/unavailability',
          setup_check: 'unavailability'
        },
        {
          label: 'Notifications',
          link: '/account/integrations',
          setup_check: 'integrations'
        }
      ]
    }
  },
  computed: {
    userSetup () {
      return this.$store.getters.userSetup
    }
  }
}
</script>

<style lang='scss' scoped>
//Makes the marker appear more clickable to the user
.step-marker {
  cursor: pointer;
}
//Makes the hovered step icon appear more dynamic
.step-marker:hover {
  background-color: #5b9ba0 !important;
}

//Makes the current step bold
.steps .step-item .step-details .step-title {
  font-weight: inherit;
}
.steps .is-active .step-details {
  font-weight: 600 !important;
}
</style>

<style>
.integration-note {
  text-align: center;
  margin: 1.5em 0em 1em 0em;
}
</style>
