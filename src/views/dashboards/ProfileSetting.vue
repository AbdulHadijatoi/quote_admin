<script setup lang="ts">
import { ref } from 'vue';

const files = ref();
const expiration_days = ref();
const expiration_notice_days = ref();
const name = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const dob = ref('');
const phone = ref('');
const address = ref('');
const previousImage = ref('path/to/previous/image.jpg'); // Replace with actual path to the previous image
const loading = ref(false);

function handleSubmit() {
  // Logic to handle form submission
  console.log({
    name: name.value,
    email: email.value,
    password: password.value,
    confirmPassword: confirmPassword.value,
    dob: dob.value,
    phone: phone.value,
    address: address.value,
    files: files.value,
    expiration_days: expiration_days.value,
    expiration_notice_days: expiration_notice_days.value,
  });
}
</script>

<template>
  <v-row>
    <v-col cols="12" md="12">
      <v-card variant="flat">
        <v-card-item>
          <div class="d-sm-flex flex-row align-center justify-space-between">
            <v-row justify="space-between">
              <v-col cols="6">
                <v-card-title>Employee Profile Settings</v-card-title>
              </v-col>
              <v-col cols="12" md="2">
                <v-btn @click="handleSubmit" color="secondary" :loading="loading" block variant="flat">
                  Save Settings
                </v-btn>
              </v-col>
            </v-row>
          </div>
        </v-card-item>
        <v-divider></v-divider>

        <v-card-text>
          <h2 class="my-4">Profile Image</h2>
          <v-divider class="mb-4"></v-divider>
          <v-row>
            <v-col cols="12" md="6">
              <h5 class="mb-3">Current Profile Image</h5>
              <v-img :src="previousImage" alt="Current Profile Image" class="mb-4" max-height="150" max-width="150"></v-img>

              <v-file-input
                v-model="files"
                :show-size="1000"
                color="deep-purple-accent-4"
                label="Select New Profile Image"
                placeholder="Selected Image"
                variant="outlined"
                counter
              >
                <template v-slot:selection="{ fileNames }">
                  <template v-for="(fileName, index) in fileNames" :key="fileName">
                    <v-chip
                      v-if="index < 2"
                      class="me-2"
                      color="deep-purple-accent-4"
                      size="small"
                      label
                    >
                      {{ fileName }}
                    </v-chip>

                    <span
                      v-else-if="index === 2"
                      class="text-overline text-grey-darken-3 mx-2"
                    >
                      +{{ files.length - 2 }} File(s)
                    </span>
                  </template>
                </template>
              </v-file-input>
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-text>
          <h2 class="my-4">Employee Details</h2>
          <v-divider class="mb-4"></v-divider>
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="name"
                label="Name"
                required
                density="compact"
                variant="outlined"
                hide-details="auto"
                color="secondary"
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field
                v-model="email"
                label="Email"
                required
                density="compact"
                variant="outlined"
                hide-details="auto"
                color="secondary"
                type="email"
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field
                v-model="password"
                label="Password"
                required
                density="compact"
                variant="outlined"
                hide-details="auto"
                color="secondary"
                type="password"
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field
                v-model="confirmPassword"
                label="Confirm Password"
                required
                density="compact"
                variant="outlined"
                hide-details="auto"
                color="secondary"
                type="password"
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field
                v-model="dob"
                label="Date of Birth"
                required
                density="compact"
                variant="outlined"
                hide-details="auto"
                color="secondary"
                type="date"
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field
                v-model="phone"
                label="Phone Number"
                required
                density="compact"
                variant="outlined"
                hide-details="auto"
                color="secondary"
                type="tel"
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="12">
              <v-textarea
                v-model="address"
                label="Address"
                required
                density="compact"
                variant="outlined"
                hide-details="auto"
                color="secondary"
              ></v-textarea>
            </v-col>
          </v-row>
        </v-card-text>

      </v-card>
    </v-col>
  </v-row>
</template>
