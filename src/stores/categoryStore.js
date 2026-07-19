import { defineStore } from "pinia";
import { quizSets as defaultCategories } from "../data/quizSets";
import {
  getCategories,
  saveCategories
} from "../utils/storage";

export const useCategoryStore = defineStore("category", {

  state: () => ({
    categories: [],
    initialized: false,
  }),

  actions: {

    initialize() {

      if (this.initialized) return;

      const saved = getCategories();

      if (saved.length) {

        this.categories = saved;

      } else {

        this.categories = [...defaultCategories];

        saveCategories(this.categories);

      }

      this.initialized = true;

    },

    addCategory(category) {

      const exists = this.categories.some(
        item => item.slug === category.slug
      );

      if (exists) return false;

      this.categories.push(category);

      saveCategories(this.categories);

      return true;

    },

    updateCategory(updatedCategory) {

      const index = this.categories.findIndex(
        item => item.slug === updatedCategory.slug
      );

      if (index === -1) return false;

      this.categories[index] = updatedCategory;

      saveCategories(this.categories);

      return true;

    },

    deleteCategory(slug) {

      this.categories = this.categories.filter(
        item => item.slug !== slug
      );

      saveCategories(this.categories);

    },

    getCategory(slug) {

      return this.categories.find(
        item => item.slug === slug
      );

    }

  }

});