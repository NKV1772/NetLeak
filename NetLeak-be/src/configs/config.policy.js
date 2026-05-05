/**
 * PolicyId khớp báo cáo Word (Chương 3.3) — P1..P4 XACML.
 */
module.exports = {
    P1_AUTHENTICATION: 'P1-AuthenticationPolicy',
    P2_OWNERSHIP: 'P2-OwnershipPolicy',
    P3_RBAC_ADMIN: 'P3-RBACPolicy',
    P4_RATING_CONSTRAINT: 'P4-RatingConstraintPolicy',

    /** Đã thay bằng PolicyId trên; seed sẽ xóa khỏi MongoDB */
    LEGACY_POLICY_IDS: [
        'POL_USER_AUTHENTICATED_ACCESS',
        'POL_ADMIN_ONLY_BACKOFFICE',
        'POL_USER_OWNER_DATA_ONLY',
        'POL_RATING_VALID_RANGE'
    ]
}
