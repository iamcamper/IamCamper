package com.iamcamper.boot_imc.mapper;

public interface LikeMapper {
    int chklike(String b_idx, String m_idx);

    int chkclike(String c_idx, String m_idx);

    int likeup(String b_idx, String m_idx);

    int likedel(String b_idx, String m_idx);

    int clikeup(String c_idx, String m_idx);

    int clikedel(String c_idx, String m_idx);

    void addlike(String m_idx, String b_idx);

    void addclike(String m_idx, String c_idx);
}
