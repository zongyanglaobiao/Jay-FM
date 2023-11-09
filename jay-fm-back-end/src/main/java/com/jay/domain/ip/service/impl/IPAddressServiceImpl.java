package com.jay.domain.ip.service.impl;


import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.jay.domain.ip.service.IPAddressService;
import com.jay.repository.entities.IPAddressEntity;
import com.jay.repository.mapper.IPAddressMapper;
import org.springframework.stereotype.Service;

/**
 * @author xxl
 * @since 2023/11/9
 */
@Service
public class IPAddressServiceImpl extends ServiceImpl<IPAddressMapper,IPAddressEntity> implements IPAddressService {

}
