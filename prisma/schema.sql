-- ============================================================
-- Bossert Immobilien — Sys-ops MySQL Schema
-- Generated: 2026-08-30
-- Database: bossert_sysops
-- ============================================================

CREATE DATABASE IF NOT EXISTS bossert_sysops
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE bossert_sysops;

-- ─────────────────────────────────────────────────────────────
-- 1. USERS
-- ─────────────────────────────────────────────────────────────
CREATE TABLE users (
    id            VARCHAR(36)   NOT NULL DEFAULT (UUID()),
    name          VARCHAR(255)  NOT NULL,
    email         VARCHAR(255)  NOT NULL,
    password      VARCHAR(255)  NOT NULL,
    role          ENUM('SUPER_ADMIN','ADMIN','EDITOR','VIEWER') NOT NULL DEFAULT 'VIEWER',
    is_active     TINYINT(1)    NOT NULL DEFAULT 1,
    last_login_at DATETIME      NULL,
    created_at    DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at    DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (id),
    UNIQUE KEY uq_users_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ─────────────────────────────────────────────────────────────
-- 2. SESSIONS (NextAuth)
-- ─────────────────────────────────────────────────────────────
CREATE TABLE sessions (
    id            VARCHAR(36)   NOT NULL DEFAULT (UUID()),
    session_token VARCHAR(512)  NOT NULL,
    user_id       VARCHAR(36)   NOT NULL,
    expires       DATETIME      NOT NULL,

    PRIMARY KEY (id),
    UNIQUE KEY uq_sessions_token (session_token),
    CONSTRAINT fk_sessions_user
        FOREIGN KEY (user_id) REFERENCES users (id)
        ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ─────────────────────────────────────────────────────────────
-- 3. PROPERTIES
-- ─────────────────────────────────────────────────────────────
CREATE TABLE properties (
    id               VARCHAR(36)    NOT NULL DEFAULT (UUID()),
    type             VARCHAR(100)   NOT NULL,
    price_display    VARCHAR(100)   NOT NULL,
    price_value      DOUBLE         NULL,
    location         VARCHAR(255)   NOT NULL,
    specs            VARCHAR(255)   NOT NULL,
    beds             INT            NULL,
    baths            INT            NULL,
    area_sqm         DOUBLE         NULL,
    status           ENUM('DRAFT','PUBLISHED','ARCHIVED') NOT NULL DEFAULT 'DRAFT',
    featured         TINYINT(1)     NOT NULL DEFAULT 0,
    hero_image       VARCHAR(1024)  NULL,
    video_url        VARCHAR(1024)  NULL,
    virtual_tour_url VARCHAR(1024)  NULL,
    description_en   LONGTEXT       NULL,
    description_de   LONGTEXT       NULL,
    lat              DOUBLE         NULL,
    lng              DOUBLE         NULL,
    property_tax     DOUBLE         NULL,
    hoa_fees         DOUBLE         NULL,
    created_at       DATETIME       NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at       DATETIME       NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (id),
    INDEX idx_properties_status (status),
    INDEX idx_properties_type (type),
    INDEX idx_properties_featured (featured)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ─────────────────────────────────────────────────────────────
-- 4. PROPERTY IMAGES
-- ─────────────────────────────────────────────────────────────
CREATE TABLE property_images (
    id          VARCHAR(36)   NOT NULL DEFAULT (UUID()),
    property_id VARCHAR(36)   NOT NULL,
    url         VARCHAR(1024) NOT NULL,
    sort_order  INT           NOT NULL DEFAULT 0,

    PRIMARY KEY (id),
    INDEX idx_property_images_property (property_id),
    CONSTRAINT fk_property_images_property
        FOREIGN KEY (property_id) REFERENCES properties (id)
        ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ─────────────────────────────────────────────────────────────
-- 5. PROPERTY AMENITIES
-- ─────────────────────────────────────────────────────────────
CREATE TABLE property_amenities (
    id          VARCHAR(36)  NOT NULL DEFAULT (UUID()),
    property_id VARCHAR(36)  NOT NULL,
    name        VARCHAR(255) NOT NULL,

    PRIMARY KEY (id),
    CONSTRAINT fk_property_amenities_property
        FOREIGN KEY (property_id) REFERENCES properties (id)
        ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ─────────────────────────────────────────────────────────────
-- 6. PROPERTY FLOOR PLANS
-- ─────────────────────────────────────────────────────────────
CREATE TABLE property_floor_plans (
    id          VARCHAR(36)   NOT NULL DEFAULT (UUID()),
    property_id VARCHAR(36)   NOT NULL,
    url         VARCHAR(1024) NOT NULL,
    sort_order  INT           NOT NULL DEFAULT 0,

    PRIMARY KEY (id),
    CONSTRAINT fk_property_floor_plans_property
        FOREIGN KEY (property_id) REFERENCES properties (id)
        ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ─────────────────────────────────────────────────────────────
-- 7. PROPERTY DOCUMENTS
-- ─────────────────────────────────────────────────────────────
CREATE TABLE property_documents (
    id          VARCHAR(36)   NOT NULL DEFAULT (UUID()),
    property_id VARCHAR(36)   NOT NULL,
    title       VARCHAR(255)  NOT NULL,
    url         VARCHAR(1024) NOT NULL,

    PRIMARY KEY (id),
    CONSTRAINT fk_property_documents_property
        FOREIGN KEY (property_id) REFERENCES properties (id)
        ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ─────────────────────────────────────────────────────────────
-- 8. NEARBY SCHOOLS
-- ─────────────────────────────────────────────────────────────
CREATE TABLE nearby_schools (
    id          VARCHAR(36)  NOT NULL DEFAULT (UUID()),
    property_id VARCHAR(36)  NOT NULL,
    name        VARCHAR(255) NOT NULL,
    distance    VARCHAR(50)  NOT NULL,

    PRIMARY KEY (id),
    CONSTRAINT fk_nearby_schools_property
        FOREIGN KEY (property_id) REFERENCES properties (id)
        ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ─────────────────────────────────────────────────────────────
-- 9. NEARBY TRANSPORT
-- ─────────────────────────────────────────────────────────────
CREATE TABLE nearby_transport (
    id          VARCHAR(36)  NOT NULL DEFAULT (UUID()),
    property_id VARCHAR(36)  NOT NULL,
    name        VARCHAR(255) NOT NULL,
    type        VARCHAR(50)  NOT NULL,
    distance    VARCHAR(50)  NOT NULL,

    PRIMARY KEY (id),
    CONSTRAINT fk_nearby_transport_property
        FOREIGN KEY (property_id) REFERENCES properties (id)
        ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ─────────────────────────────────────────────────────────────
-- 10. ARTICLES (Knowledge Hub)
-- ─────────────────────────────────────────────────────────────
CREATE TABLE articles (
    id            VARCHAR(36)   NOT NULL DEFAULT (UUID()),
    slug          VARCHAR(255)  NOT NULL,
    category      VARCHAR(100)  NOT NULL,
    date          VARCHAR(50)   NOT NULL,
    hero_image    VARCHAR(1024) NULL,
    featured      TINYINT(1)    NOT NULL DEFAULT 0,
    status        ENUM('DRAFT','PUBLISHED') NOT NULL DEFAULT 'DRAFT',
    title_en      VARCHAR(500)  NOT NULL,
    title_de      VARCHAR(500)  NULL,
    desc_en       TEXT          NOT NULL,
    desc_de       TEXT          NULL,
    content_en    LONGTEXT      NOT NULL,
    content_de    LONGTEXT      NULL,
    meta_title_en VARCHAR(255)  NULL,
    meta_desc_en  TEXT          NULL,
    created_at    DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at    DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (id),
    UNIQUE KEY uq_articles_slug (slug),
    INDEX idx_articles_status (status),
    INDEX idx_articles_category (category),
    INDEX idx_articles_featured (featured)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ─────────────────────────────────────────────────────────────
-- 11. TESTIMONIALS
-- ─────────────────────────────────────────────────────────────
CREATE TABLE testimonials (
    id         VARCHAR(36)   NOT NULL DEFAULT (UUID()),
    quote_en   TEXT          NOT NULL,
    quote_de   TEXT          NULL,
    author     VARCHAR(255)  NOT NULL,
    location   VARCHAR(255)  NOT NULL,
    image      VARCHAR(1024) NULL,
    sort_order INT           NOT NULL DEFAULT 0,
    is_active  TINYINT(1)    NOT NULL DEFAULT 1,
    created_at DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (id),
    INDEX idx_testimonials_active (is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ─────────────────────────────────────────────────────────────
-- 12. REFERENCES (Past Transactions)
-- ─────────────────────────────────────────────────────────────
CREATE TABLE `references` (
    id             VARCHAR(36)   NOT NULL DEFAULT (UUID()),
    slug           VARCHAR(255)  NOT NULL,
    title_en       VARCHAR(500)  NOT NULL,
    title_de       VARCHAR(500)  NULL,
    location       VARCHAR(255)  NOT NULL,
    type           VARCHAR(100)  NOT NULL,
    hero_image     VARCHAR(1024) NULL,
    size           VARCHAR(50)   NULL,
    featured       TINYINT(1)    NOT NULL DEFAULT 0,
    sort_order     INT           NOT NULL DEFAULT 0,
    description_en TEXT          NOT NULL,
    description_de TEXT          NULL,
    full_desc_en   LONGTEXT      NULL,
    full_desc_de   LONGTEXT      NULL,
    stats_json     TEXT          NULL,
    is_active      TINYINT(1)    NOT NULL DEFAULT 1,
    created_at     DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at     DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (id),
    UNIQUE KEY uq_references_slug (slug),
    INDEX idx_references_featured (featured),
    INDEX idx_references_active (is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ─────────────────────────────────────────────────────────────
-- 13. REFERENCE IMAGES
-- ─────────────────────────────────────────────────────────────
CREATE TABLE reference_images (
    id           VARCHAR(36)   NOT NULL DEFAULT (UUID()),
    reference_id VARCHAR(36)   NOT NULL,
    url          VARCHAR(1024) NOT NULL,
    sort_order   INT           NOT NULL DEFAULT 0,

    PRIMARY KEY (id),
    CONSTRAINT fk_reference_images_reference
        FOREIGN KEY (reference_id) REFERENCES `references` (id)
        ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ─────────────────────────────────────────────────────────────
-- 14. REFERENCE FEATURES
-- ─────────────────────────────────────────────────────────────
CREATE TABLE reference_features (
    id           VARCHAR(36)  NOT NULL DEFAULT (UUID()),
    reference_id VARCHAR(36)  NOT NULL,
    feature_en   VARCHAR(500) NOT NULL,
    feature_de   VARCHAR(500) NULL,
    sort_order   INT          NOT NULL DEFAULT 0,

    PRIMARY KEY (id),
    CONSTRAINT fk_reference_features_reference
        FOREIGN KEY (reference_id) REFERENCES `references` (id)
        ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ─────────────────────────────────────────────────────────────
-- 15. TEAM MEMBERS
-- ─────────────────────────────────────────────────────────────
CREATE TABLE team_members (
    id         VARCHAR(36)   NOT NULL DEFAULT (UUID()),
    name       VARCHAR(255)  NOT NULL,
    title_en   VARCHAR(255)  NOT NULL,
    title_de   VARCHAR(255)  NULL,
    quote_en   TEXT          NULL,
    quote_de   TEXT          NULL,
    image      VARCHAR(1024) NULL,
    sort_order INT           NOT NULL DEFAULT 0,
    is_active  TINYINT(1)    NOT NULL DEFAULT 1,
    created_at DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (id),
    INDEX idx_team_active (is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ─────────────────────────────────────────────────────────────
-- 16. FAQs
-- ─────────────────────────────────────────────────────────────
CREATE TABLE faqs (
    id          VARCHAR(36)  NOT NULL DEFAULT (UUID()),
    question_en VARCHAR(500) NOT NULL,
    question_de VARCHAR(500) NULL,
    answer_en   TEXT         NOT NULL,
    answer_de   TEXT         NULL,
    sort_order  INT          NOT NULL DEFAULT 0,
    is_active   TINYINT(1)   NOT NULL DEFAULT 1,
    created_at  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (id),
    INDEX idx_faqs_active (is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ─────────────────────────────────────────────────────────────
-- 17. SITE SETTINGS (key-value per page)
-- ─────────────────────────────────────────────────────────────
CREATE TABLE site_settings (
    id         VARCHAR(36)  NOT NULL DEFAULT (UUID()),
    page       VARCHAR(50)  NOT NULL,
    key_name   VARCHAR(100) NOT NULL,
    value_en   LONGTEXT     NOT NULL,
    value_de   LONGTEXT     NULL,
    created_at DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (id),
    UNIQUE KEY uq_site_settings_page_key (page, key_name),
    INDEX idx_site_settings_page (page)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ─────────────────────────────────────────────────────────────
-- 18. CONTACT SUBMISSIONS
-- ─────────────────────────────────────────────────────────────
CREATE TABLE contact_submissions (
    id           VARCHAR(36)  NOT NULL DEFAULT (UUID()),
    name         VARCHAR(255) NOT NULL,
    email        VARCHAR(255) NULL,
    phone        VARCHAR(100) NULL,
    inquiry_type VARCHAR(100) NULL,
    message      TEXT         NOT NULL,
    source       VARCHAR(100) NOT NULL DEFAULT 'contact_page',
    heard_about  VARCHAR(100) NULL,    -- How they found us: LinkedIn, Google, Referral, etc.
    status       ENUM('NEW','READ','RESPONDED') NOT NULL DEFAULT 'NEW',
    created_at   DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at   DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (id),
    INDEX idx_submissions_status (status),
    INDEX idx_submissions_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ─────────────────────────────────────────────────────────────
-- 19. NEWSLETTER SUBSCRIBERS
-- ─────────────────────────────────────────────────────────────
CREATE TABLE newsletter_subscribers (
    id            VARCHAR(36)  NOT NULL DEFAULT (UUID()),
    email         VARCHAR(255) NOT NULL,
    is_active     TINYINT(1)   NOT NULL DEFAULT 1,
    subscribed_at DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (id),
    UNIQUE KEY uq_newsletter_email (email),
    INDEX idx_newsletter_active (is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ─────────────────────────────────────────────────────────────
-- 20. AUDIT LOG
-- ─────────────────────────────────────────────────────────────
CREATE TABLE audit_logs (
    id          VARCHAR(36)  NOT NULL DEFAULT (UUID()),
    user_id     VARCHAR(36)  NOT NULL,
    user_email  VARCHAR(255) NOT NULL,
    action      VARCHAR(20)  NOT NULL,
    entity_type VARCHAR(100) NOT NULL,
    entity_id   VARCHAR(36)  NULL,
    detail      TEXT         NULL,
    created_at  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (id),
    INDEX idx_audit_user (user_id),
    INDEX idx_audit_entity (entity_type, entity_id),
    INDEX idx_audit_created (created_at),
    CONSTRAINT fk_audit_user
        FOREIGN KEY (user_id) REFERENCES users (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ─────────────────────────────────────────────────────────────
-- SEED: Super Admin
-- 1. Generate a bcrypt hash from your SUPERADMIN_PASSWORD in .env.local:
--    node -e "require('bcryptjs').hash('YourPassword', 12).then(console.log)"
-- 2. Paste the hash below and run this INSERT
-- ─────────────────────────────────────────────────────────────
-- INSERT INTO users (id, name, email, password, role) VALUES (
--     UUID(),
--     'Super Admin',
--     'superadmin@bossert-immobilien.de',
--     '$2b$12$REPLACE_WITH_YOUR_BCRYPT_HASH',
--     'SUPER_ADMIN'
-- );

-- ─────────────────────────────────────────────────────────────
-- HOW TO APPLY
-- mysql -u root -p bossert_sysops < schema.sql
--
-- HOW TO AUTO-SEED (via app)
-- npm run db:seed     (reads SUPERADMIN_* from .env.local and seeds DB)
-- ─────────────────────────────────────────────────────────────
