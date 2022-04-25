<!-- eslint-disable prettier/prettier -->
<template>
<div class="card container">
  <div class="row">
    <div class="card-header justify-content-center col-6">
      <h4>Customer data:</h4>
      <form
        @submit="submitForm"
      >
        <div class="mb-3 form-group">
          <label for="coaches" class="form-label">Select User</label>
          <select v-model="user_id" class="form-control" name="user" id="user" :class="{ 'is-invalid': user_idError }">
            <option disabled>Select user</option>
            <option v-for="user in users" :key="user.id" :value="user.id">
              {{ user.name }}
            </option>
          </select>
          <span class="invalid-feedback" v-if="user_idError">{{ user_idError }}</span>
        </div>

        <div class="mb-3 form-group">
          <label for="coaches" class="form-label">Select Gym</label>
          <select v-model="gym_id" class="form-control" name="gym" id="gym" :class="{ 'is-invalid': gym_idError }">
            <option disabled>Select gym</option>
            <option v-for="gym in gyms" :key="gym.id" :value="gym.id">
              {{ gym.name }}
            </option>
          </select>
          <span class="invalid-feedback" v-if="gym_idError">{{ gym_idError }}</span>
        </div>

        <div class="mb-3 form-group">
          <label for="coaches" class="form-label">Select Package</label>
          <select v-model="package_id" class="form-control" name="package" id="package" :class="{ 'is-invalid': package_idError }">
            <option disabled>Select package</option>
            <option v-for="pack in packages" :key="pack.id" :value="pack.id">
              {{ pack.name }}
            </option>
          </select>
          <span class="invalid-feedback" v-if="package_idError">{{ package_idError }}</span>
        </div>
      <h4>Customer personal data:</h4>
      <div class="mb-3 form-group">
        <label for="customername" class="form-label">Name</label>
        <input
          type="text"
          class="form-control"
          id="customername"
          name="customername"
          v-model="customername"
          :class="{ 'is-invalid': customernameError }"
        />
        <span class="invalid-feedback" v-if="customernameError">{{ customernameError }}</span>
      </div>
      <div class="mb-3 form-group">
        <label for="email" class="form-label">Email</label>
        <input
          type="email"
          class="form-control"
          id="email"
          name="email"
          v-model="email"
          :class="{ 'is-invalid': emailError }"
        />
        <span class="invalid-feedback" v-if="emailError">{{ emailError }}</span>
      </div>
      <div class="mb-3 form-group">
        <label for="phone" class="form-label">Phone</label>
        <input
          type="text"
          class="form-control"
          id="phone"
          name="phone"
          v-model="phone"
          :class="{ 'is-invalid': phoneError }"
        />
        <span class="invalid-feedback" v-if="phoneError">{{ phoneError }}</span>
      </div>
      <div class="mb-3 form-group">
        <label for="address" class="form-label">Address</label>
        <input
          type="text"
          class="form-control"
          id="address"
          name="address"
          v-model="address"
          :class="{ 'is-invalid': addressError }"
        />
        <span class="invalid-feedback" v-if="addressError">{{ addressError }}</span>
      </div>
      <div class="mb-3 form-group">
        <label for="city" class="form-label">City</label>
        <input
          type="text"
          class="form-control"
          id="city"
          name="city"
          v-model="city"
          :class="{ 'is-invalid': cityError }"
        />
        <span class="invalid-feedback" v-if="cityError">{{ cityError }}</span>
      </div>
      <div class="mb-3 form-group">
        <label for="country" class="form-label">Country</label>
        <input
          type="text"
          class="form-control"
          id="country"
          name="country"
          v-model="country"
          :class="{ 'is-invalid': countryError }"
        />
        <span class="invalid-feedback" v-if="countryError">{{ countryError }}</span>
      </div>
      <div class="mb-3 form-group">
        <label for="zip" class="form-label">Zip</label>
        <input
          type="text"
          class="form-control"
          id="zip"
          name="zip"
          v-model="zip"
          :class="{ 'is-invalid': zipError }"
        />
        <span class="invalid-feedback" v-if="zipError">{{ zipError }}</span>
      </div>

      </form>
      </div>
        <div class="container col-6">
          <CreditCardForm
            :selected_user="selected_user"
            :selected_gym="selected_gym"
            :selected_package="selected_package"
            :customername="customername"
            :email="email"
            :phone="phone"
            :address="address"
            :city="city"
            :country="country"
            :zip="zip"
            :method="submitForm"
          />
          <div v-if="user_id || package_id ">
            <div class="card-body">
              <div class="container">
                <p v-if="user_id" >Potential purchase of {{ selected_user.name }}</p>
                <div v-if="package_id" class="row">
                    <div>
                      <p>{{selected_package.name}}</p>
                      <p><small>with sessions of: {{selected_package.session_count}}</small></p>
                      <p class="float-end">{{selected_package.price}}</p>
                    </div>
                  <div class="">
                    <p class="float-end fw-bold">Total: ${{selected_package.price}}</p>
                  </div>
                  <hr style="border: 2px solid black;">
                </div>
              </div>
            </div>
          </div>
        </div>
  </div>
</div>

</template>
<script>
/*eslint-disable prettier/prettier*/
import PackagesService from "../../services/GymManagers/PackagesService";
import GymMembers from "../../services/GymMembers/GymMemberService";
import GymService from "../../services/Gym/GymService";
import { useForm, useField } from 'vee-validate';
import * as yup from 'yup';
import CreditCardForm from "./CreditCard/CreditCardForm";



export default {
  name: "Buy-Package",
  components: {
    CreditCardForm,
  },
  data() {
    return {
      users:[],
      gyms: [],
      packages: [],
      selected_user: "",
      selected_gym: "",
      selected_package: "",
    };
  },
  setup() {
    const Schema = yup.object({
      user_id: yup.string().required('User selection is required').label('User'),
      gym_id: yup.string().required('Gym selection is required').label('Gym'),
      package_id: yup.string().required('Package selection is required').label('Package'),
      customername: yup.string().required("We need a name to call you").min(3).label("Name"),
      email: yup.string().required("What do you think this is? Fill your Email").email().label("Email"),
      phone: yup.string().required("Don't worry we won't call you unless it's urgent! Fill your phone").min(11).label("Phone"),
      address: yup.string().required("We need to know where do you live.. for researchs").label("Address"),
      city: yup.string().required().label("City"),
      country: yup.string().required().label("Country"),
      zip: yup.string().required().min(5).label("Zip"),
    });
    const { handleSubmit } = useForm({
      validationSchema: Schema,
    });


    const submitForm = handleSubmit(()=> {
      return true;
    });

    const { value: user_id, errorMessage: user_idError  } = useField('user_id');
    const { value: gym_id, errorMessage: gym_idError  } = useField('gym_id');
    const { value: package_id, errorMessage: package_idError  } = useField('package_id');
    const { value: customername, errorMessage: customernameError } = useField('customername');
    const { value: email, errorMessage: emailError } = useField('email');
    const { value: phone, errorMessage: phoneError } = useField('phone');
    const { value: address, errorMessage: addressError } = useField('address');
    const { value: city, errorMessage: cityError } = useField('city');
    const { value: country, errorMessage: countryError } = useField('country');
    const { value: zip, errorMessage: zipError } = useField('zip');

    return {
      submitForm,
      user_id,
      user_idError,
      gym_id,
      gym_idError,
      package_id,
      package_idError,
      customername,
      customernameError,
      email,
      emailError,
      phone,
      phoneError,
      address,
      addressError,
      city,
      cityError,
      country,
      countryError,
      zip,
      zipError,
    };
  },
  methods: {
    getGyms: function () {
      GymService.getAll()
        .then((response) => {
          this.gyms = response.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getPackages: function () {
      PackagesService.getAll()
        .then((response) => {
          this.packages = response.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getUsers: function () {
      GymMembers.getAll()
        .then((response) => {
          this.users = response.data.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  created() {
    this.getGyms();
    this.getPackages();
    this.getUsers();
  },
  watch:{
    user_id:function(){
      this.selected_user = this.users.find(user => user.id == this.user_id);
    },
    gym_id:function(){
      this.selected_gym = this.gyms.find(gym => gym.id === this.gym_id);
    },
    package_id:function(){
      this.selected_package = this.packages.find(packz => packz.id === this.package_id);
    },
  },
};
</script>
<style src="@vueform/multiselect/themes/default.css"></style>
