"use client";

import {
  FormEvent,
  useMemo,
  useState,
} from "react";

import {
  AnimatePresence,
  motion,
} from "framer-motion";

import {
  AlertTriangle,
  CheckCircle2,
  Edit3,
  FolderTree,
  Loader2,
  Plus,
  Search,
  X,
  XCircle,
} from "lucide-react";

import { toast } from "sonner";

import Pagination from "@/layout/adminLayout/Pagination";

import {
  useChangeSkillCategoryStatus,
  useCreateSkillCategory,
  useSkillCategories,
  useUpdateSkillCategory,
} from "@/hooks/useSkillCategory";

import {
  SkillCategory,
  SkillCategoryFormData,
  SkillCategoryStatus,
} from "@/typescript/interface/skillCategory.interface";

import { skillCategoryValidationSchema } from "@/services/validation/skillCategory.validation";
import { getErrorMessage } from "@/services/helper/global.helper";
import { ValidationError } from "yup";

// ==========================================================
// CONSTANTS
// ==========================================================

const ITEMS_PER_PAGE = 6;

// ==========================================================
// ANIMATION VARIANTS
// ==========================================================

const containerVariants = {
  hidden: {
    opacity: 0,
  },

  visible: {
    opacity: 1,

    transition: {
      staggerChildren: 0.06,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 15,
  },

  visible: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.35,
    },
  },
};

// ==========================================================
// PAGE
// ==========================================================

export default function SkillCategoryManagementPage() {
  // ========================================================
  // STATE
  // ========================================================

  const [currentPage, setCurrentPage] =
    useState(1);

  const [search, setSearch] = useState("");

  const [isModalOpen, setIsModalOpen] =
    useState(false);

  const [editingCategory, setEditingCategory] =
    useState<SkillCategory | null>(null);

  const [statusCategory, setStatusCategory] =
    useState<SkillCategory | null>(null);

  const [formData, setFormData] =
    useState<SkillCategoryFormData>({
      name: "",
      description: "",
    });

  const [formErrors, setFormErrors] =
    useState<
      Partial<Record<keyof SkillCategoryFormData, string>>
    >({});

  // ========================================================
  // QUERIES
  // ========================================================

  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
  } = useSkillCategories(
    currentPage,
    ITEMS_PER_PAGE,
  );

  // ========================================================
  // MUTATIONS
  // ========================================================

  const createMutation =
    useCreateSkillCategory();

  const updateMutation =
    useUpdateSkillCategory();

  const statusMutation =
    useChangeSkillCategoryStatus();

  // ========================================================
  // DATA
  // ========================================================

  
  const pagination =
    data?.pagination ?? {
      currentPage: 1,
      limit: ITEMS_PER_PAGE,
      totalCategories: 0,
      totalPages: 1,
      hasNextPage: false,
      hasPreviousPage: false,
    };

  // ========================================================
  // SEARCH
  // ========================================================
const categories: SkillCategory[] = useMemo(
  () => data?.data || [],
  [data?.data]
);
  const filteredCategories =
    useMemo(() => {
      
      const searchValue =
        search.trim().toLowerCase();

      if (!searchValue) {
        return categories;
      }

      return categories.filter(
        (category) =>
          category.name
            .toLowerCase()
            .includes(searchValue) ||
          category.description
            .toLowerCase()
            .includes(searchValue),
      );
    }, [categories, search]);

  // ========================================================
  // SUMMARY
  // ========================================================

  const activeCategories =
    categories.filter(
      (category) =>
        category.status === "active",
    ).length;

  const inactiveCategories =
    categories.filter(
      (category) =>
        category.status === "inactive",
    ).length;

  // ========================================================
  // MODAL OPEN
  // ========================================================

  const openCreateModal = () => {
    setEditingCategory(null);

    setFormData({
      name: "",
      description: "",
    });

    setFormErrors({});

    setIsModalOpen(true);
  };

  const openEditModal = (
    category: SkillCategory,
  ) => {
    setEditingCategory(category);

    setFormData({
      name: category.name,
      description: category.description,
    });

    setFormErrors({});

    setIsModalOpen(true);
  };

  // ========================================================
  // CLOSE MODAL
  // ========================================================

  const closeModal = () => {
    if (
      createMutation.isPending ||
      updateMutation.isPending
    ) {
      return;
    }

    setIsModalOpen(false);

    setEditingCategory(null);

    setFormData({
      name: "",
      description: "",
    });

    setFormErrors({});
  };

  // ========================================================
  // FORM INPUT
  // ========================================================

  const handleInputChange = (
    field: keyof SkillCategoryFormData,
    value: string,
  ) => {
    setFormData((previous) => ({
      ...previous,
      [field]: value,
    }));

    setFormErrors((previous) => ({
      ...previous,
      [field]: undefined,
    }));
  };

  // ========================================================
  // FORM SUBMIT
  // ========================================================

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    try {
      const validatedData =
        await skillCategoryValidationSchema.validate(
          formData,
          {
            abortEarly: false,
          },
        );

      setFormErrors({});

      if (editingCategory) {
        await updateMutation.mutateAsync({
          id: editingCategory._id,
          payload: validatedData,
        });

        toast.success(
          "Skill category updated successfully",
        );
      } else {
        await createMutation.mutateAsync(
          validatedData,
        );

        toast.success(
          "Skill category created successfully",
        );
      }

      closeModal();
    } catch (validationOrApiError: unknown) {
      // ====================================================
      // YUP VALIDATION ERROR
      // ====================================================

       if (validationOrApiError instanceof ValidationError) {
    const errors: Partial<
      Record<keyof SkillCategoryFormData, string>
    > = {};

    validationOrApiError.inner.forEach((item) => {
      if (
        item.path &&
        !errors[item.path as keyof SkillCategoryFormData]
      ) {
        errors[item.path as keyof SkillCategoryFormData] =
          item.message;
      }
    });

    setFormErrors(errors);
    return;
  }

      // ====================================================
      // API ERROR
      // ====================================================

      toast.error(getErrorMessage(validationOrApiError));
    }
  };

  // ========================================================
  // STATUS CONFIRMATION
  // ========================================================

  const openStatusConfirmation = (
    category: SkillCategory,
  ) => {
    setStatusCategory(category);
  };

  const closeStatusConfirmation = () => {
    if (statusMutation.isPending) {
      return;
    }

    setStatusCategory(null);
  };

  // ========================================================
  // STATUS CHANGE
  // ========================================================

  const handleStatusChange = async () => {
    if (!statusCategory) {
      return;
    }

    const newStatus: SkillCategoryStatus =
      statusCategory.status === "active"
        ? "inactive"
        : "active";

    try {
      await statusMutation.mutateAsync({
        id: statusCategory._id,
        payload: {
          status: newStatus,
        },
      });

      toast.success(
        newStatus === "active"
          ? "Category activated successfully"
          : "Category deactivated successfully",
      );

      closeStatusConfirmation();
    } catch (apiError) {
      toast.error(getErrorMessage(apiError));
    }
  };

  // ========================================================
  // PAGE CHANGE
  // ========================================================

  const handlePageChange = (page: number) => {
    setCurrentPage(page);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // ========================================================
  // SEARCH CHANGE
  // ========================================================

  const handleSearchChange = (
    value: string,
  ) => {
    setSearch(value);

    if (currentPage !== 1) {
      setCurrentPage(1);
    }
  };

  // ========================================================
  // LOADING
  // ========================================================

  if (isLoading) {
    return (
      <div className="min-h-[calc(100vh-80px)] bg-[#0B0804] px-4 py-6 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1600px]">
          <div className="flex min-h-[500px] items-center justify-center">
            <motion.div
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "linear",
              }}
              className="h-10 w-10 rounded-full border-2 border-orange-500/20 border-t-orange-500"
            />
          </div>
        </div>
      </div>
    );
  }

  // ========================================================
  // ERROR
  // ========================================================

  if (isError) {
    return (
      <div className="min-h-[calc(100vh-80px)] bg-[#0B0804] px-4 py-6 text-white sm:px-6 lg:px-8">
        <div className="mx-auto flex min-h-125 max-w-[1600px] items-center justify-center">
          <div className="rounded-2xl border border-red-500/20 bg-[#160B07] p-8 text-center">
            <XCircle className="mx-auto mb-4 h-12 w-12 text-red-400" />

            <h2 className="text-lg font-semibold text-white">
              Failed to load skill categories
            </h2>

            <p className="mt-2 text-sm text-slate-400">
              {getErrorMessage(error) ||
                "Something went wrong while fetching categories."}
            </p>

            <button
              onClick={() => refetch()}
              className="mt-5 rounded-xl bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-600"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ========================================================
  // MAIN UI
  // ========================================================

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#0B0804] px-4 py-6 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1600px]">

        {/* ==================================================
            HEADER
        ================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: -20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.45,
          }}
          className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-end"
        >
          {/* <div>
            <div className="mb-2 flex items-center gap-2">
              <div className="rounded-lg bg-orange-500/10 p-2">
                <FolderTree className="h-5 w-5 text-orange-400" />
              </div>

              <span className="text-sm font-medium text-orange-400">
                Skill Management
              </span>
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-[#FFF7ED] sm:text-3xl">
              Skill Categories
            </h1>

            <p className="mt-1 text-sm text-[#A8A29E]">
              Organize your skills into manageable
              categories.
            </p>
          </div> */}

          <motion.button
            whileHover={{
              scale: 1.02,
            }}
            whileTap={{
              scale: 0.98,
            }}
            onClick={openCreateModal}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-linear-to-r from-orange-500 to-amber-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-950/30 transition hover:from-orange-600 hover:to-amber-600"
          >
            <Plus className="h-4 w-4" />
            Add Category
          </motion.button>
        </motion.div>

        {/* ==================================================
            SUMMARY CARDS
        ================================================== */}

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3"
        >
          {/* TOTAL */}

          <motion.div
            variants={itemVariants}
            className="rounded-2xl border border-[#3D2110] bg-[#160C06] p-5 shadow-xl shadow-black/10"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#A8A29E]">
                  Total Categories
                </p>

                <p className="mt-2 text-3xl font-bold text-[#FFF7ED]">
                  {pagination.totalCategories}
                </p>
              </div>

              <div className="rounded-xl bg-orange-500/10 p-3">
                <FolderTree className="h-6 w-6 text-orange-400" />
              </div>
            </div>
          </motion.div>

          {/* ACTIVE */}

          <motion.div
            variants={itemVariants}
            className="rounded-2xl border border-[#3D2110] bg-[#160C06] p-5 shadow-xl shadow-black/10"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#A8A29E]">
                  Active
                </p>

                <p className="mt-2 text-3xl font-bold text-emerald-400">
                  {activeCategories}
                </p>
              </div>

              <div className="rounded-xl bg-emerald-500/10 p-3">
                <CheckCircle2 className="h-6 w-6 text-emerald-400" />
              </div>
            </div>
          </motion.div>

          {/* INACTIVE */}

          <motion.div
            variants={itemVariants}
            className="rounded-2xl border border-[#3D2110] bg-[#160C06] p-5 shadow-xl shadow-black/10"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#A8A29E]">
                  Inactive
                </p>

                <p className="mt-2 text-3xl font-bold text-red-400">
                  {inactiveCategories}
                </p>
              </div>

              <div className="rounded-xl bg-red-500/10 p-3">
                <XCircle className="h-6 w-6 text-red-400" />
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* ==================================================
            TABLE SECTION
        ================================================== */}

        <motion.section
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.45,
            delay: 0.1,
          }}
          className="overflow-hidden rounded-2xl border border-[#3D2110] bg-[#120A05] shadow-2xl shadow-black/20"
        >
          {/* TABLE HEADER */}

          <div className="border-b border-[#3D2110] p-5 sm:p-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

              <div>
                <h2 className="text-lg font-semibold text-[#FFF7ED]">
                  All Categories
                </h2>

                <p className="mt-1 text-sm text-[#A8A29E]">
                  Manage skill categories from here.
                </p>
              </div>

              {/* SEARCH */}

              <div className="relative w-full lg:max-w-sm">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />

                <input
                  type="text"
                  value={search}
                  onChange={(event) =>
                    handleSearchChange(
                      event.target.value,
                    )
                  }
                  placeholder="Search categories..."
                  className="w-full rounded-xl border border-[#3D2110] bg-[#1A0D06] py-2.5 pl-10 pr-4 text-sm text-[#FFF7ED] outline-none placeholder:text-slate-600 transition focus:border-orange-500/60 focus:ring-2 focus:ring-orange-500/10"
                />
              </div>
            </div>
          </div>

          {/* ==================================================
              TABLE
          ================================================== */}

          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead>
                <tr className="border-b border-[#3D2110] bg-[#180D07]">
                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-[#A8A29E]">
                    Category
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-[#A8A29E]">
                    Description
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-[#A8A29E]">
                    Status
                  </th>

                  <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wider text-[#A8A29E]">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                <AnimatePresence mode="popLayout">
                  {filteredCategories.map(
                    (category) => (
                      <motion.tr
                        key={category._id}
                        layout
                        initial={{
                          opacity: 0,
                          y: 10,
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                        }}
                        exit={{
                          opacity: 0,
                          y: -10,
                        }}
                        transition={{
                          duration: 0.25,
                        }}
                        className="border-b border-[#2A170C] transition hover:bg-[#1A0D06]"
                      >
                        {/* CATEGORY */}

                        <td className="px-5 py-5">
                          <div className="flex items-center gap-3">
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-orange-500/20 bg-orange-500/10">
                              <FolderTree className="h-5 w-5 text-orange-400" />
                            </div>

                            <div>
                              <p className="font-semibold text-[#FFF7ED]">
                                {category.name}
                              </p>

                              {category.createdAt && (
                                <p className="mt-1 text-xs text-slate-500">
                                  {new Date(
                                    category.createdAt,
                                  ).toLocaleDateString()}
                                </p>
                              )}
                            </div>
                          </div>
                        </td>

                        {/* DESCRIPTION */}

                        <td className="max-w-md px-5 py-5">
                          <p className="line-clamp-2 text-sm leading-6 text-slate-400">
                            {category.description}
                          </p>
                        </td>

                        {/* STATUS */}

                        <td className="px-5 py-5">
                          {category.status ===
                          "active" ? (
                            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-400">
                              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                              Active
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 rounded-full border border-red-500/20 bg-red-500/10 px-3 py-1.5 text-xs font-semibold text-red-400">
                              <span className="h-1.5 w-1.5 rounded-full bg-red-400" />
                              Inactive
                            </span>
                          )}
                        </td>

                        {/* ACTIONS */}

                        <td className="px-5 py-5">
                          <div className="flex items-center justify-end gap-2">
                            <motion.button
                              whileHover={{
                                scale: 1.05,
                              }}
                              whileTap={{
                                scale: 0.95,
                              }}
                              onClick={() =>
                                openEditModal(
                                  category,
                                )
                              }
                              className="rounded-lg border border-orange-500/20 bg-orange-500/10 p-2 text-orange-400 transition hover:border-orange-500/40 hover:bg-orange-500/20"
                              title="Edit category"
                            >
                              <Edit3 className="h-4 w-4" />
                            </motion.button>

                            <motion.button
                              whileHover={{
                                scale: 1.05,
                              }}
                              whileTap={{
                                scale: 0.95,
                              }}
                              onClick={() =>
                                openStatusConfirmation(
                                  category,
                                )
                              }
                              className={
                                category.status ===
                                "active"
                                  ? "rounded-lg border border-red-500/20 bg-red-500/10 p-2 text-red-400 transition hover:border-red-500/40 hover:bg-red-500/20"
                                  : "rounded-lg border border-emerald-500/20 bg-emerald-500/10 p-2 text-emerald-400 transition hover:border-emerald-500/40 hover:bg-emerald-500/20"
                              }
                              title={
                                category.status ===
                                "active"
                                  ? "Deactivate"
                                  : "Activate"
                              }
                            >
                              {category.status ===
                              "active" ? (
                                <XCircle className="h-4 w-4" />
                              ) : (
                                <CheckCircle2 className="h-4 w-4" />
                              )}
                            </motion.button>
                          </div>
                        </td>
                      </motion.tr>
                    ),
                  )}
                </AnimatePresence>
              </tbody>
            </table>
          </div>

          {/* ==================================================
              EMPTY STATE
          ================================================== */}

          {filteredCategories.length === 0 && (
            <div className="flex min-h-70 flex-col items-center justify-center px-5 py-10 text-center">
              <div className="mb-4 rounded-2xl bg-orange-500/10 p-4">
                {search ? (
                  <Search className="h-8 w-8 text-orange-400" />
                ) : (
                  <FolderTree className="h-8 w-8 text-orange-400" />
                )}
              </div>

              <h3 className="text-base font-semibold text-[#FFF7ED]">
                {search
                  ? "No categories found"
                  : "No skill categories yet"}
              </h3>

              <p className="mt-1 max-w-sm text-sm text-[#A8A29E]">
                {search
                  ? "Try changing your search keyword."
                  : "Create your first skill category to get started."}
              </p>

              {!search && (
                <button
                  onClick={openCreateModal}
                  className="mt-5 inline-flex items-center gap-2 rounded-xl bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-600"
                >
                  <Plus className="h-4 w-4" />
                  Add Category
                </button>
              )}
            </div>
          )}

          {/* ==================================================
              PAGINATION
          ================================================== */}

          {categories.length > 0 && (
            <div className="px-5 pb-5 sm:px-6">
              <Pagination
                currentPage={
                  pagination.currentPage
                }
                totalPages={
                  pagination.totalPages
                }
                onPageChange={
                  handlePageChange
                }
                disabled={isLoading}
              />
            </div>
          )}
        </motion.section>
      </div>

      {/* ====================================================
          CREATE / EDIT MODAL
      ==================================================== */}

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
            onMouseDown={(event) => {
              if (
                event.target ===
                event.currentTarget
              ) {
                closeModal();
              }
            }}
          >
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.95,
                y: 20,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.95,
                y: 20,
              }}
              transition={{
                duration: 0.25,
              }}
              className="w-full max-w-lg overflow-hidden rounded-2xl border border-[#5A2D12] bg-[#100A06] shadow-2xl shadow-black/50"
            >
              {/* MODAL HEADER */}

              <div className="flex items-center justify-between border-b border-[#3D2110] bg-[#180D07] px-5 py-4">
                <div>
                  <h2 className="text-lg font-semibold text-[#FFF7ED]">
                    {editingCategory
                      ? "Edit Skill Category"
                      : "Add Skill Category"}
                  </h2>

                  <p className="mt-1 text-xs text-[#A8A29E]">
                    {editingCategory
                      ? "Update the category details."
                      : "Create a new skill category."}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded-lg p-2 text-slate-400 transition hover:bg-white/5 hover:text-white"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* FORM */}

              <form
                onSubmit={handleSubmit}
                className="space-y-5 p-5 sm:p-6"
              >
                {/* NAME */}

                <div>
                  <label className="mb-2 block text-sm font-medium text-[#FFF7ED]">
                    Category Name
                  </label>

                  <input
                    type="text"
                    value={formData.name}
                    onChange={(event) =>
                      handleInputChange(
                        "name",
                        event.target.value,
                      )
                    }
                    placeholder="e.g. Programming"
                    className={`w-full rounded-xl border ${
                      formErrors.name
                        ? "border-red-500/60"
                        : "border-[#4A2814]"
                    } bg-[#1A0D06] px-4 py-3 text-sm text-[#FFF7ED] outline-none placeholder:text-slate-600 transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10`}
                  />

                  {formErrors.name && (
                    <p className="mt-1.5 text-xs text-red-400">
                      {formErrors.name}
                    </p>
                  )}
                </div>

                {/* DESCRIPTION */}

                <div>
                  <label className="mb-2 block text-sm font-medium text-[#FFF7ED]">
                    Description
                  </label>

                  <textarea
                    value={
                      formData.description
                    }
                    onChange={(event) =>
                      handleInputChange(
                        "description",
                        event.target.value,
                      )
                    }
                    placeholder="Describe this skill category..."
                    rows={5}
                    className={`w-full resize-none rounded-xl border ${
                      formErrors.description
                        ? "border-red-500/60"
                        : "border-[#4A2814]"
                    } bg-[#1A0D06] px-4 py-3 text-sm leading-6 text-[#FFF7ED] outline-none placeholder:text-slate-600 transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10`}
                  />

                  {formErrors.description && (
                    <p className="mt-1.5 text-xs text-red-400">
                      {
                        formErrors.description
                      }
                    </p>
                  )}
                </div>

                {/* BUTTONS */}

                <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
                  <button
                    type="button"
                    onClick={closeModal}
                    disabled={
                      createMutation.isPending ||
                      updateMutation.isPending
                    }
                    className="rounded-xl border border-[#3D2110] bg-[#1A0D06] px-5 py-2.5 text-sm font-semibold text-slate-300 transition hover:bg-[#241207] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Cancel
                  </button>

                  <motion.button
                    whileHover={{
                      scale: 1.01,
                    }}
                    whileTap={{
                      scale: 0.98,
                    }}
                    type="submit"
                    disabled={
                      createMutation.isPending ||
                      updateMutation.isPending
                    }
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-linear-to-r from-orange-500 to-amber-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:from-orange-600 hover:to-amber-600 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {(
                      createMutation.isPending ||
                      updateMutation.isPending
                    ) && (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    )}

                    {editingCategory
                      ? "Update Category"
                      : "Create Category"}
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ====================================================
          STATUS CONFIRMATION MODAL
      ==================================================== */}

      <AnimatePresence>
        {statusCategory && (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            className="fixed inset-0 z-60 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.95,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                scale: 0.95,
              }}
              className="w-full max-w-md rounded-2xl border border-[#5A2D12] bg-[#100A06] p-6 shadow-2xl shadow-black/50"
            >
              <div className="flex items-start gap-4">
                <div
                  className={
                    statusCategory.status ===
                    "active"
                      ? "rounded-xl bg-red-500/10 p-3"
                      : "rounded-xl bg-emerald-500/10 p-3"
                  }
                >
                  <AlertTriangle
                    className={
                      statusCategory.status ===
                      "active"
                        ? "h-6 w-6 text-red-400"
                        : "h-6 w-6 text-emerald-400"
                    }
                  />
                </div>

                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-[#FFF7ED]">
                    {statusCategory.status ===
                    "active"
                      ? "Deactivate Category?"
                      : "Activate Category?"}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-[#A8A29E]">
                    Are you sure you want to{" "}
                    {statusCategory.status ===
                    "active"
                      ? "deactivate"
                      : "activate"}{" "}
                    <span className="font-semibold text-orange-400">
                      {statusCategory.name}
                    </span>
                    ?
                  </p>
                </div>
              </div>

              <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={
                    closeStatusConfirmation
                  }
                  disabled={
                    statusMutation.isPending
                  }
                  className="rounded-xl border border-[#3D2110] bg-[#1A0D06] px-5 py-2.5 text-sm font-semibold text-slate-300 transition hover:bg-[#241207] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Cancel
                </button>

                <motion.button
                  whileHover={{
                    scale: 1.01,
                  }}
                  whileTap={{
                    scale: 0.98,
                  }}
                  type="button"
                  onClick={
                    handleStatusChange
                  }
                  disabled={
                    statusMutation.isPending
                  }
                  className={
                    statusCategory.status ===
                    "active"
                      ? "inline-flex items-center justify-center gap-2 rounded-xl bg-red-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50"
                      : "inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-50"
                  }
                >
                  {statusMutation.isPending && (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  )}

                  {statusCategory.status ===
                  "active"
                    ? "Deactivate"
                    : "Activate"}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}