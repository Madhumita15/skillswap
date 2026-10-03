"use client";

import {
  ChangeEvent,
  FormEvent,
  useEffect,
  useMemo,
  useState,
} from "react";

import * as yup from "yup";

import { AnimatePresence, motion } from "framer-motion";

import {
  AlertTriangle,
  CheckCircle2,
  Edit3,
  ImagePlus,
  Plus,
  Search,
  Sparkles,
  X,
  XCircle,
} from "lucide-react";

import {
  useCreateSkill,
  useDeactivateSkill,
  useSkills,
  useUpdateSkill,
} from "@/hooks/useSkills";

import type { Skill } from "@/typescript/interface/skillsAdmin.interface";

import { skillValidationSchema } from "@/services/validation/skills.validation";

import { useSkillCategories } from "@/hooks/useSkillCategory";

import Pagination from "@/layout/adminLayout/Pagination";

/* =====================================================
   CONSTANTS
===================================================== */

const ITEMS_PER_PAGE = 6;

/* =====================================================
   ANIMATION VARIANTS
===================================================== */

const containerVariants = {
  hidden: {},

  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },

  visible: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

const modalVariants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    y: 20,
  },

  visible: {
    opacity: 1,
    scale: 1,
    y: 0,

    transition: {
      duration: 0.25,
      ease: "easeOut",
    },
  },

  exit: {
    opacity: 0,
    scale: 0.95,
    y: 20,

    transition: {
      duration: 0.2,
    },
  },
};

/* =====================================================
   EMPTY FORM
===================================================== */

const initialForm = {
  name: "",
  description: "",
  category: "",
  skill_logo: null as File | null,
};

/* =====================================================
   PAGE
===================================================== */

export default function SkillsManagementPage() {
  /* =====================================================
     STATES
  ===================================================== */

  const [page, setPage] = useState(1);

  const [search, setSearch] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);

  const [form, setForm] = useState(initialForm);

  const [preview, setPreview] = useState<string | null>(null);

  const [formError, setFormError] = useState("");

  const [successMessage, setSuccessMessage] = useState("");

  /* =====================================================
     TANSTACK QUERY
  ===================================================== */

  const {
    data,
    isLoading,
    isError,
    error,
  } = useSkills(page, ITEMS_PER_PAGE, search,);

  const {
    data: categoryData,
    isLoading: isCategoriesLoading,
  } = useSkillCategories(1, 100);

  const createMutation = useCreateSkill();

  const updateMutation = useUpdateSkill();

  const deactivateMutation = useDeactivateSkill();

  /* =====================================================
     API DATA
  ===================================================== */

  const skills = data?.data ?? [];

  const totalSkills = data?.totalSkills ?? 0;

  const activeSkills = data?.activeSkills ?? 0;

  const inactiveSkills = data?.inactiveSkills ?? 0;

  const totalPages = data?.totalPages ?? 1;

  const categories =
    categoryData?.data?.filter(
      (category) => category.status === "active",
    ) ?? [];


  /* =====================================================
     CLEANUP IMAGE PREVIEW
  ===================================================== */

  useEffect(() => {
    return () => {
      if (preview?.startsWith("blob:")) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  /* =====================================================
     OPEN CREATE MODAL
  ===================================================== */

  const handleCreate = () => {
    setEditingSkill(null);

    setForm(initialForm);

    setPreview(null);

    setFormError("");

    setSuccessMessage("");

    setIsModalOpen(true);
  };

  /* =====================================================
     OPEN EDIT MODAL
  ===================================================== */

  const handleEdit = (skill: Skill) => {
    setEditingSkill(skill);

    setForm({
      name: skill.name,
      description: skill.description,
      category:
        typeof skill.category === "string"
          ? skill.category
          : skill.category?._id || "",
      skill_logo: null,
    });

    setPreview(skill.skill_logo || null);

    setFormError("");

    setSuccessMessage("");

    setIsModalOpen(true);
  };

  /* =====================================================
     CLOSE MODAL
  ===================================================== */

  const handleCloseModal = () => {
    if (
      createMutation.isPending ||
      updateMutation.isPending
    ) {
      return;
    }

    setIsModalOpen(false);

    setEditingSkill(null);

    setForm(initialForm);

    setPreview(null);

    setFormError("");

    setSuccessMessage("");
  };

  /* =====================================================
     INPUT CHANGE
  ===================================================== */

  const handleInputChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    if (formError) {
      setFormError("");
    }
  };

  /* =====================================================
     IMAGE CHANGE
  ===================================================== */

  const handleImageChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const validationData = {
      ...form,
      skill_logo: file,
    };

    try {
      skillValidationSchema.validateSyncAt(
        "skill_logo",
        validationData,
      );

      setFormError("");

      setForm((previous) => ({
        ...previous,
        skill_logo: file,
      }));

      setPreview((previousPreview) => {
        if (previousPreview?.startsWith("blob:")) {
          URL.revokeObjectURL(previousPreview);
        }

        return URL.createObjectURL(file);
      });
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        setFormError(error.message);
      } else {
        setFormError(
          "Unable to validate the selected image.",
        );
      }

      event.target.value = "";
    }
  };

  /* =====================================================
     SUBMIT FORM
  ===================================================== */

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    setFormError("");

    setSuccessMessage("");

    /* ===================================================
       YUP VALIDATION
    =================================================== */

    try {
      await skillValidationSchema.validate(form, {
        abortEarly: false,
      });
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        setFormError(
          error.errors[0] ||
            "Please check the form fields.",
        );
      } else {
        setFormError("Please check the form fields.");
      }

      return;
    }

    /* ===================================================
       CREATE FORMDATA
    =================================================== */

    const formData = new FormData();

    formData.append(
      "name",
      form.name.trim(),
    );

    formData.append(
      "description",
      form.description.trim(),
    );

    formData.append(
      "category",
      form.category,
    );

    if (form.skill_logo) {
      formData.append(
        "skill_logo",
        form.skill_logo,
      );
    }

    /* ===================================================
       API REQUEST
    =================================================== */

    try {
      /* -------------------------------------------------
         UPDATE
      ------------------------------------------------- */

      if (editingSkill) {
        await updateMutation.mutateAsync({
          id: editingSkill._id,
          formData,
        });

        setSuccessMessage(
          "Skill updated successfully.",
        );
      }

      /* -------------------------------------------------
         CREATE
      ------------------------------------------------- */

      else {
        await createMutation.mutateAsync(formData);

        setSuccessMessage(
          "Skill created successfully.",
        );
      }

      /* -------------------------------------------------
         CLOSE MODAL
      ------------------------------------------------- */

      setTimeout(() => {
        setIsModalOpen(false);

        setEditingSkill(null);

        setForm(initialForm);

        setPreview(null);

        setFormError("");

        setSuccessMessage("");
      }, 700);
    } catch (err: any) {
      setFormError(
        err?.response?.data?.message ||
          "Something went wrong. Please try again.",
      );
    }
  };

  /* =====================================================
     DEACTIVATE SKILL
  ===================================================== */

  const handleDeactivate = async (
    skill: Skill,
  ) => {
    const confirmed = window.confirm(
      `Are you sure you want to deactivate "${skill.name}"?`,
    );

    if (!confirmed) {
      return;
    }

    try {
      await deactivateMutation.mutateAsync(
        skill._id,
      );

      setSuccessMessage(
        `"${skill.name}" has been deactivated.`,
      );

      setTimeout(() => {
        setSuccessMessage("");
      }, 2500);
    } catch (err: any) {
      setFormError(
        err?.response?.data?.message ||
          "Unable to deactivate skill.",
      );

      setTimeout(() => {
        setFormError("");
      }, 2500);
    }
  };

  /* ===================================================== 
  SEARCH CHANGE 
  ===================================================== */ 
  const handleSearchChange = ( 
    event: ChangeEvent<HTMLInputElement>, ) => { 
    const value = event.target.value;
     setSearch(value); 
     /* * Whenever a new search starts, 
     * always return to page 1. * 
     * Example: * * Page 5 + search "react" * 
     * * becomes: * * Page 1 + search "react" 
     * */ 
    setPage(1); 

  };
  /* =====================================================
     PAGINATION
  ===================================================== */

  const handlePageChange = (
    newPage: number,
  ) => {
    if (
      newPage < 1 ||
      newPage > totalPages ||
      newPage === page
    ) {
      return;
    }

    setPage(newPage);

    setSearch("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /* =====================================================
     LOADING
  ===================================================== */

  if (isLoading) {
    return <SkillsLoading />;
  }

  /* =====================================================
     ERROR
  ===================================================== */

  if (isError) {
    return (
      <div className="min-h-[calc(100vh-81px)] bg-[#0B0804] px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-2xl border border-red-500/20 bg-[#140A05] p-8 text-center shadow-xl">
            <XCircle className="mx-auto mb-4 h-12 w-12 text-red-400" />

            <h2 className="text-lg font-semibold text-[#FFF7ED]">
              Unable to load skills
            </h2>

            <p className="mt-2 text-sm text-[#A8A29E]">
              {error instanceof Error
                ? error.message
                : "Something went wrong while loading skills."}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-81px)] bg-[#0B0804] px-4 py-6 sm:px-6 lg:px-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mx-auto max-w-7xl"
      >
        {/* =================================================
            HEADER
        ================================================= */}

        <motion.div
          variants={itemVariants}
          className="mb-7 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-end"
        >
          <motion.button
            whileHover={{
              scale: 1.02,
              boxShadow:
                "0 0 25px rgba(245,166,35,0.22)",
            }}
            whileTap={{
              scale: 0.98,
            }}
            onClick={handleCreate}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#E59A0B] to-[#F5A623] px-5 text-sm font-semibold text-[#0B0804] shadow-lg shadow-orange-950/20 transition"
          >
            <Plus className="h-4 w-4" />
            Add New Skill
          </motion.button>
        </motion.div>

        {/* =================================================
            SUCCESS MESSAGE
        ================================================= */}

        <AnimatePresence>
          {successMessage && (
            <motion.div
              initial={{
                opacity: 0,
                y: -10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -10,
              }}
              className="mb-5 flex items-center gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300"
            >
              <CheckCircle2 className="h-5 w-5 shrink-0" />

              {successMessage}
            </motion.div>
          )}
        </AnimatePresence>

        {/* =================================================
            SUMMARY
        ================================================= */}

        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <SummaryCard
            title="Total Skills"
            value={totalSkills}
            icon={Sparkles}
            description="Standardized skills"
          />

          <SummaryCard
            title="Active"
            value={activeSkills}
            icon={CheckCircle2}
            description="Currently available"
            positive
          />

          <SummaryCard
            title="Inactive"
            value={inactiveSkills}
            icon={XCircle}
            description="Currently disabled"
            danger
          />
        </div>

        {/* =================================================
            TOOLBAR
        ================================================= */}

        <motion.div
          variants={itemVariants}
          className="mb-6 rounded-2xl border border-[#3D2110] bg-[#140A05] p-4 shadow-xl shadow-black/10"
        >
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-sm font-semibold text-[#FFF7ED]">
                Standardized Skills
              </h2>

              <p className="mt-1 text-xs text-[#78716C]">
                Manage skill names, descriptions and logos.
              </p>
            </div>

            <div className="relative w-full md:max-w-sm">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#78716C]" />

              <input
                type="text"
                value={search}
                onChange={handleSearchChange}
                placeholder="Search skills..."
                className="h-10 w-full rounded-xl border border-[#3D2110] bg-[#0B0804] pl-10 pr-4 text-sm text-[#FFF7ED] outline-none placeholder:text-[#57534E] transition focus:border-[#E59A0B] focus:ring-1 focus:ring-[#E59A0B]/30"
              />
            </div>
          </div>
        </motion.div>

        {/* =================================================
            SKILLS
        ================================================= */}

        {skills.length === 0 ? (
          <EmptySkills
            search={search}
            onCreate={handleCreate}
          />
        ) : (
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3"
          >
            {skills.map((skill) => (
              <SkillCard
                key={skill._id}
                skill={skill}
                onEdit={handleEdit}
                onDeactivate={handleDeactivate}
                isDeactivating={
                  deactivateMutation.isPending &&
                  deactivateMutation.variables ===
                    skill._id
                }
              />
            ))}
          </motion.div>
        )}

        {/* =================================================
            PAGINATION
        ================================================= */}

        {totalPages > 1 && (
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            disabled={isLoading}
          />
        )}
      </motion.div>

      {/* ===================================================
          CREATE / EDIT MODAL
      =================================================== */}

      <AnimatePresence>
        {isModalOpen && (
          <SkillModal
            editingSkill={editingSkill}
            form={form}
            categories={categories}
            isCategoriesLoading={
              isCategoriesLoading
            }
            preview={preview}
            formError={formError}
            successMessage={successMessage}
            isSubmitting={
              createMutation.isPending ||
              updateMutation.isPending
            }
            onClose={handleCloseModal}
            onChange={handleInputChange}
            onImageChange={handleImageChange}
            onSubmit={handleSubmit}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

/* =========================================================
   SUMMARY CARD
========================================================= */

type SummaryCardProps = {
  title: string;
  value: number;
  description: string;
  icon: React.ElementType;
  positive?: boolean;
  danger?: boolean;
};

function SummaryCard({
  title,
  value,
  description,
  icon: Icon,
  positive,
  danger,
}: SummaryCardProps) {
  return (
    <motion.div
      variants={itemVariants}
      whileHover={{
        y: -3,
      }}
      className="group rounded-2xl border border-[#3D2110] bg-[#140A05] p-5 shadow-xl shadow-black/10 transition"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-[#78716C]">
            {title}
          </p>

          <p className="mt-2 text-3xl font-bold text-[#FFF7ED]">
            {value}
          </p>

          <p className="mt-1 text-xs text-[#A8A29E]">
            {description}
          </p>
        </div>

        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl border ${
            positive
              ? "border-emerald-500/20 bg-emerald-500/10"
              : danger
                ? "border-red-500/20 bg-red-500/10"
                : "border-[#4A2812] bg-[#1A0D06]"
          }`}
        >
          <Icon
            className={`h-5 w-5 ${
              positive
                ? "text-emerald-400"
                : danger
                  ? "text-red-400"
                  : "text-[#F5A623]"
            }`}
          />
        </div>
      </div>

      <div className="mt-5 h-px w-full bg-gradient-to-r from-[#E59A0B]/30 via-[#4A2812] to-transparent" />
    </motion.div>
  );
}

/* =========================================================
   SKILL CARD
========================================================= */

type SkillCardProps = {
  skill: Skill;
  onEdit: (skill: Skill) => void;
  onDeactivate: (skill: Skill) => void;
  isDeactivating: boolean;
};

function SkillCard({
  skill,
  onEdit,
  onDeactivate,
  isDeactivating,
}: SkillCardProps) {
  const isActive = skill.status === "active";

  return (
    <motion.div
      variants={itemVariants}
      whileHover={{
        y: -5,
        boxShadow:
          "0 15px 40px rgba(0,0,0,0.25)",
      }}
      className="group overflow-hidden rounded-2xl border border-[#3D2110] bg-[#140A05] shadow-xl shadow-black/10 transition"
    >
      <div className="h-1 w-full bg-gradient-to-r from-[#E59A0B] via-[#F5A623] to-transparent opacity-70" />

      <div className="p-5">
        {/* Logo + Status */}

        <div className="flex items-start justify-between">
          <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-xl border border-[#4A2812] bg-[#0B0804]">
            {skill.skill_logo ? (
              <img
                src={skill.skill_logo}
                alt={skill.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <Sparkles className="h-6 w-6 text-[#E59A0B]" />
            )}
          </div>

          <span
            className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium ${
              isActive
                ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-300"
                : "border-red-500/20 bg-red-500/10 text-red-300"
            }`}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                isActive
                  ? "bg-emerald-400"
                  : "bg-red-400"
              }`}
            />

            {isActive ? "Active" : "Inactive"}
          </span>
        </div>

        {/* Name */}

        <h3 className="mt-5 truncate text-lg font-semibold text-[#FFF7ED]">
          {skill.name}
        </h3>

        {/* Category */}

        {skill.category && (
          <p className="mt-1 text-xs font-medium text-[#E59A0B]">
            {typeof skill.category === "string"
              ? skill.category
              : skill.category.name}
          </p>
        )}

        {/* Description */}

        <p className="mt-2 min-h-[48px] text-sm leading-6 text-[#A8A29E]">
          {skill.description}
        </p>

        {/* Date */}

        {skill.createdAt && (
          <p className="mt-4 text-[11px] text-[#57534E]">
            Created{" "}
            {new Date(
              skill.createdAt,
            ).toLocaleDateString()}
          </p>
        )}

        {/* Actions */}

        <div className="mt-5 flex gap-2 border-t border-[#3D2110] pt-4">
          <motion.button
            whileHover={{
              scale: 1.02,
            }}
            whileTap={{
              scale: 0.98,
            }}
            onClick={() => onEdit(skill)}
            className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-[#4A2812] bg-[#1A0D06] px-3 py-2.5 text-xs font-medium text-[#D6D3D1] transition hover:border-[#E59A0B]/50 hover:bg-[#E59A0B]/10 hover:text-[#F5A623]"
          >
            <Edit3 className="h-3.5 w-3.5" />
            Edit
          </motion.button>

          {isActive && (
            <motion.button
              whileHover={{
                scale: 1.02,
              }}
              whileTap={{
                scale: 0.98,
              }}
              disabled={isDeactivating}
              onClick={() => onDeactivate(skill)}
              className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-red-500/20 bg-red-500/5 px-3 py-2.5 text-xs font-medium text-red-300 transition hover:border-red-500/40 hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isDeactivating ? (
                <>
                  <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-red-300/30 border-t-red-300" />
                  Deactivating
                </>
              ) : (
                <>
                  <XCircle className="h-3.5 w-3.5" />
                  Deactivate
                </>
              )}
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

/* =========================================================
   SKILL MODAL
========================================================= */

type SkillModalProps = {
  editingSkill: Skill | null;

  form: {
    name: string;
    description: string;
    category: string;
    skill_logo: File | null;
  };

  categories: {
    _id: string;
    name: string;
  }[];

  isCategoriesLoading: boolean;

  preview: string | null;

  formError: string;

  successMessage: string;

  isSubmitting: boolean;

  onClose: () => void;

  onChange: (
    event: ChangeEvent<
      HTMLInputElement |
        HTMLTextAreaElement |
        HTMLSelectElement
    >,
  ) => void;

  onImageChange: (
    event: ChangeEvent<HTMLInputElement>,
  ) => void;

  onSubmit: (
    event: FormEvent<HTMLFormElement>,
  ) => void;
};

function SkillModal({
  editingSkill,
  form,
  categories,
  isCategoriesLoading,
  preview,
  formError,
  successMessage,
  isSubmitting,
  onClose,
  onChange,
  onImageChange,
  onSubmit,
}: SkillModalProps) {
  return (
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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (
          event.target ===
          event.currentTarget
        ) {
          onClose();
        }
      }}
    >
      <motion.div
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl border border-[#4A2812] bg-[#140A05] shadow-2xl shadow-black/50"
      >
        {/* Header */}

        <div className="flex items-center justify-between border-b border-[#3D2110] px-5 py-4 sm:px-6">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-[#F5A623]" />

              <h2 className="text-base font-semibold text-[#FFF7ED]">
                {editingSkill
                  ? "Edit Skill"
                  : "Create New Skill"}
              </h2>
            </div>

            <p className="mt-1 text-xs text-[#78716C]">
              {editingSkill
                ? "Update the standardized skill information."
                : "Add a new standardized skill to SkillSwap."}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#3D2110] text-[#A8A29E] transition hover:border-[#E59A0B]/40 hover:bg-[#E59A0B]/10 hover:text-[#F5A623] disabled:opacity-50"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Form */}

        <form
          onSubmit={onSubmit}
          className="space-y-5 p-5 sm:p-6"
        >
          {/* Error */}

          <AnimatePresence>
            {formError && (
              <motion.div
                initial={{
                  opacity: 0,
                  height: 0,
                }}
                animate={{
                  opacity: 1,
                  height: "auto",
                }}
                exit={{
                  opacity: 0,
                  height: 0,
                }}
                className="flex items-start gap-3 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300"
              >
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />

                <span>{formError}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Success */}

          {successMessage && (
            <div className="flex items-center gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">
              <CheckCircle2 className="h-4 w-4" />

              {successMessage}
            </div>
          )}

          {/* Name */}

          <div>
            <label className="mb-2 block text-xs font-medium text-[#D6D3D1]">
              Skill Name
            </label>

            <input
              type="text"
              name="name"
              value={form.name}
              onChange={onChange}
              placeholder="e.g. React.js"
              disabled={isSubmitting}
              className="h-11 w-full rounded-xl border border-[#3D2110] bg-[#0B0804] px-4 text-sm text-[#FFF7ED] outline-none placeholder:text-[#57534E] transition focus:border-[#E59A0B] focus:ring-1 focus:ring-[#E59A0B]/30 disabled:cursor-not-allowed disabled:opacity-60"
            />
          </div>

          {/* Category */}

          <div>
            <label
              htmlFor="category"
              className="mb-2 block text-xs font-medium text-[#D6D3D1]"
            >
              Skill Category
            </label>

            <select
              id="category"
              name="category"
              value={form.category}
              onChange={onChange}
              disabled={
                isSubmitting ||
                isCategoriesLoading
              }
              className="h-11 w-full rounded-xl border border-[#3D2110] bg-[#0B0804] px-4 text-sm text-[#FFF7ED] outline-none transition focus:border-[#E59A0B] focus:ring-1 focus:ring-[#E59A0B]/30 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <option
                value=""
                className="bg-[#0B0804] text-[#78716C]"
              >
                {isCategoriesLoading
                  ? "Loading categories..."
                  : "Select a category"}
              </option>

              {categories.map(
                (category) => (
                  <option
                    key={category._id}
                    value={category._id}
                    className="bg-[#0B0804] text-[#FFF7ED]"
                  >
                    {category.name}
                  </option>
                ),
              )}
            </select>

            {!isCategoriesLoading &&
              categories.length === 0 && (
                <p className="mt-2 text-[11px] text-red-300">
                  No active categories
                  available. Please create a
                  category first.
                </p>
              )}
          </div>

          {/* Description */}

          <div>
            <label className="mb-2 block text-xs font-medium text-[#D6D3D1]">
              Description
            </label>

            <textarea
              name="description"
              value={form.description}
              onChange={onChange}
              placeholder="Describe what this skill represents..."
              rows={4}
              disabled={isSubmitting}
              className="w-full resize-none rounded-xl border border-[#3D2110] bg-[#0B0804] px-4 py-3 text-sm leading-6 text-[#FFF7ED] outline-none placeholder:text-[#57534E] transition focus:border-[#E59A0B] focus:ring-1 focus:ring-[#E59A0B]/30 disabled:cursor-not-allowed disabled:opacity-60"
            />
          </div>

          {/* Image */}

          <div>
            <label className="mb-2 block text-xs font-medium text-[#D6D3D1]">
              Skill Logo
            </label>

            <div className="flex flex-col gap-4 sm:flex-row">
              {/* Preview */}

              <div className="flex h-28 w-28 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-[#4A2812] bg-[#0B0804]">
                {preview ? (
                  <img
                    src={preview}
                    alt="Skill preview"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <ImagePlus className="h-7 w-7 text-[#57534E]" />
                )}
              </div>

              {/* Upload */}

              <div className="flex flex-1 flex-col justify-center">
                <label
                  htmlFor="skill-logo"
                  className="inline-flex w-fit cursor-pointer items-center gap-2 rounded-lg border border-[#4A2812] bg-[#1A0D06] px-4 py-2.5 text-xs font-medium text-[#D6D3D1] transition hover:border-[#E59A0B]/50 hover:bg-[#E59A0B]/10 hover:text-[#F5A623]"
                >
                  <ImagePlus className="h-4 w-4" />
                  Choose Image
                </label>

                <input
                  id="skill-logo"
                  type="file"
                  accept=".jpg,.jpeg,.png,.webp"
                  onChange={onImageChange}
                  disabled={isSubmitting}
                  className="hidden"
                />

                <p className="mt-2 text-[11px] leading-5 text-[#78716C]">
                  JPG, JPEG, PNG or WEBP.
                  <br />
                  Maximum file size: 5 MB.
                </p>
              </div>
            </div>
          </div>

          {/* Buttons */}

          <div className="flex flex-col-reverse gap-3 border-t border-[#3D2110] pt-5 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="h-10 rounded-xl border border-[#4A2812] bg-[#1A0D06] px-5 text-sm font-medium text-[#A8A29E] transition hover:border-[#E59A0B]/40 hover:text-[#FFF7ED] disabled:cursor-not-allowed disabled:opacity-50"
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
              disabled={isSubmitting}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#E59A0B] to-[#F5A623] px-6 text-sm font-semibold text-[#0B0804] shadow-lg shadow-orange-950/20 transition disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#0B0804]/30 border-t-[#0B0804]" />

                  Saving...
                </>
              ) : (
                <>
                  {editingSkill ? (
                    <Edit3 className="h-4 w-4" />
                  ) : (
                    <Plus className="h-4 w-4" />
                  )}

                  {editingSkill
                    ? "Update Skill"
                    : "Create Skill"}
                </>
              )}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}

/* =========================================================
   EMPTY STATE
========================================================= */

type EmptySkillsProps = {
  search: string;
  onCreate: () => void;
};

function EmptySkills({
  search,
  onCreate,
}: EmptySkillsProps) {
  return (
    <motion.div
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      className="rounded-2xl border border-[#3D2110] bg-[#140A05] px-6 py-16 text-center"
    >
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-[#4A2812] bg-[#1A0D06]">
        {search ? (
          <Search className="h-7 w-7 text-[#E59A0B]" />
        ) : (
          <Sparkles className="h-7 w-7 text-[#E59A0B]" />
        )}
      </div>

      <h3 className="mt-5 text-base font-semibold text-[#FFF7ED]">
        {search
          ? "No skills found"
          : "No skills available"}
      </h3>

      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#78716C]">
        {search
          ? `No skills match "${search}". Try another search term.`
          : "Create your first standardized skill to start managing the SkillSwap skill library."}
      </p>

      {!search && (
        <motion.button
          whileHover={{
            scale: 1.02,
          }}
          whileTap={{
            scale: 0.98,
          }}
          onClick={onCreate}
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#E59A0B] to-[#F5A623] px-5 py-2.5 text-sm font-semibold text-[#0B0804]"
        >
          <Plus className="h-4 w-4" />
          Add First Skill
        </motion.button>
      )}
    </motion.div>
  );
}

/* =========================================================
   LOADING STATE
========================================================= */

function SkillsLoading() {
  return (
    <div className="min-h-[calc(100vh-81px)] bg-[#0B0804] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header skeleton */}

        <div className="mb-7 animate-pulse">
          <div className="h-4 w-36 rounded bg-[#1A0D06]" />

          <div className="mt-3 h-8 w-64 rounded bg-[#1A0D06]" />

          <div className="mt-3 h-4 w-full max-w-xl rounded bg-[#1A0D06]" />
        </div>

        {/* Summary skeleton */}

        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {Array.from({
            length: 3,
          }).map((_, index) => (
            <div
              key={index}
              className="h-32 animate-pulse rounded-2xl border border-[#3D2110] bg-[#140A05]"
            />
          ))}
        </div>

        {/* Toolbar skeleton */}

        <div className="mb-6 h-20 animate-pulse rounded-2xl border border-[#3D2110] bg-[#140A05]" />

        {/* Cards skeleton */}

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({
            length: 6,
          }).map((_, index) => (
            <div
              key={index}
              className="h-72 animate-pulse rounded-2xl border border-[#3D2110] bg-[#140A05]"
            />
          ))}
        </div>
      </div>
    </div>
  );
}